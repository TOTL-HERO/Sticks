import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";
import { orgRoleMiddleware } from "../middleware/orgRole.ts";
import {
  generateStrokePlayPairings,
  generateBracket,
  type SeedEntry,
} from "../services/pairingEngine.ts";
import { generateCSV, generatePDF, type TournamentExportData, type ExportEntry } from "../services/exportService.ts";
import { computeSeasonStandings, type FinalizedTournament, type PointsSystemConfig } from "../services/seasonService.ts";
import { supabaseAdmin } from "../lib/supabase.ts";

type Env = { Variables: { userId: string; orgRole?: string; internalUserId?: string } };

const tournaments = new Hono<Env>();

// ─── Helper: resolve internal user id ────────────────────────────────────────

async function getInternalUser(authId: string) {
  return prisma.user.findUnique({ where: { authId } });
}

// ─── Valid status transitions ────────────────────────────────────────────────

const VALID_TRANSITIONS: Record<string, string[]> = {
  DRAFT: ["REGISTRATION_OPEN", "CANCELLED"],
  REGISTRATION_OPEN: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};

// ─── Tournament CRUD ─────────────────────────────────────────────────────────

// POST /tournaments — create tournament
tournaments.post("/", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const body = await c.req.json();
  const tournament = await prisma.tournament.create({
    data: {
      organizationId: body.organizationId,
      name: body.name,
      format: body.format ?? "STROKE_PLAY",
      handicapMode: body.handicapMode ?? null,
      handicapAllowance: body.handicapAllowance ?? 100,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      prizePool: body.prizePool ?? null,
      hostingType: body.hostingType ?? "STICKS_HOSTED",
      bracketType: body.bracketType ?? null,
      flightConfig: body.flightConfig ?? null,
      multiRoundConfig: body.multiRoundConfig ?? null,
      teeAssignment: body.teeAssignment ?? null,
      seasonId: body.seasonId ?? null,
      status: "DRAFT",
    },
  });
  return c.json(tournament, 201);
});


// GET /tournaments — list by org/status
tournaments.get("/", async (c) => {
  const orgId = c.req.query("organizationId");
  const status = c.req.query("status");
  const where: Record<string, unknown> = {};
  if (orgId) where.organizationId = orgId;
  if (status) where.status = status;

  const list = await prisma.tournament.findMany({
    where,
    include: { organization: { select: { name: true, logoUrl: true, colorScheme: true } } },
    orderBy: { createdAt: "desc" },
  });
  return c.json({ tournaments: list });
});

// GET /tournaments/:id — detail
tournaments.get("/:id", async (c) => {
  const id = c.req.param("id");
  const tournament = await prisma.tournament.findUnique({
    where: { id },
    include: {
      organization: { select: { name: true, logoUrl: true, colorScheme: true } },
      season: { select: { id: true, name: true } },
    },
  });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);
  return c.json(tournament);
});

// PUT /tournaments/:id — update (status restrictions)
tournaments.put("/:id", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const existing = await prisma.tournament.findUnique({ where: { id } });
  if (!existing) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);

  // IN_PROGRESS: only allow name, prizePool, endDate
  if (existing.status === "IN_PROGRESS") {
    const updated = await prisma.tournament.update({
      where: { id },
      data: {
        name: body.name ?? existing.name,
        prizePool: body.prizePool ?? existing.prizePool,
        endDate: body.endDate ? new Date(body.endDate) : existing.endDate,
      },
    });
    return c.json({ ...updated, warning: "Tournament is IN_PROGRESS — only name, prizePool, endDate can be edited" });
  }

  // COMPLETED/CANCELLED: no edits
  if (existing.status === "COMPLETED" || existing.status === "CANCELLED") {
    return c.json({ error: "Cannot edit a completed or cancelled tournament", statusCode: 400 }, 400);
  }

  // DRAFT/REGISTRATION_OPEN: all fields editable
  const updated = await prisma.tournament.update({
    where: { id },
    data: {
      name: body.name ?? existing.name,
      format: body.format ?? existing.format,
      handicapMode: body.handicapMode ?? existing.handicapMode,
      handicapAllowance: body.handicapAllowance ?? existing.handicapAllowance,
      startDate: body.startDate ? new Date(body.startDate) : existing.startDate,
      endDate: body.endDate ? new Date(body.endDate) : existing.endDate,
      prizePool: body.prizePool ?? existing.prizePool,
      hostingType: body.hostingType ?? existing.hostingType,
      bracketType: body.bracketType !== undefined ? body.bracketType : existing.bracketType,
      flightConfig: body.flightConfig !== undefined ? body.flightConfig : existing.flightConfig,
      multiRoundConfig: body.multiRoundConfig !== undefined ? body.multiRoundConfig : existing.multiRoundConfig,
      teeAssignment: body.teeAssignment !== undefined ? body.teeAssignment : existing.teeAssignment,
      seasonId: body.seasonId !== undefined ? body.seasonId : existing.seasonId,
    },
  });
  return c.json(updated);
});

// POST /tournaments/:id/status — status transitions
tournaments.post("/:id/status", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const targetStatus = body.status as string;

  const tournament = await prisma.tournament.findUnique({ where: { id } });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);

  const allowed = VALID_TRANSITIONS[tournament.status] ?? [];
  if (!allowed.includes(targetStatus)) {
    return c.json({
      error: `Invalid transition from ${tournament.status} to ${targetStatus}`,
      statusCode: 400,
    }, 400);
  }

  const updated = await prisma.tournament.update({
    where: { id },
    data: { status: targetStatus as any },
  });
  return c.json(updated);
});


// ─── Player Registration ─────────────────────────────────────────────────────

// POST /tournaments/:id/register — player self-registration
tournaments.post("/:id/register", async (c) => {
  const tournamentId = c.req.param("id");
  const authId = c.get("userId") as string;
  const user = await getInternalUser(authId);
  if (!user) return c.json({ error: "User not found", statusCode: 404 }, 404);

  const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);
  if (tournament.status !== "REGISTRATION_OPEN") {
    return c.json({ error: "Registration is not open", statusCode: 400 }, 400);
  }

  // Auto-assign flight based on GHIN index and flightConfig
  let flight: string | null = null;
  if (tournament.flightConfig && user.ghinIndex != null) {
    const config = tournament.flightConfig as { flights: { name: string; minHandicap: number; maxHandicap: number }[] };
    if (config.flights) {
      for (const f of config.flights) {
        if (user.ghinIndex >= f.minHandicap && user.ghinIndex <= f.maxHandicap) {
          flight = f.name;
          break;
        }
      }
    }
  }

  try {
    const entry = await prisma.tournamentEntry.create({
      data: {
        tournamentId,
        userId: user.id,
        flight,
        paymentStatus: "PENDING",
      },
    });
    return c.json(entry, 201);
  } catch (err: any) {
    if (err?.code === "P2002") {
      return c.json({ error: "Already registered for this tournament", statusCode: 409 }, 409);
    }
    throw err;
  }
});

// DELETE /tournaments/:id/register — player withdrawal
tournaments.delete("/:id/register", async (c) => {
  const tournamentId = c.req.param("id");
  const authId = c.get("userId") as string;
  const user = await getInternalUser(authId);
  if (!user) return c.json({ error: "User not found", statusCode: 404 }, 404);

  const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);
  if (tournament.status !== "REGISTRATION_OPEN") {
    return c.json({ error: "Cannot withdraw — registration is not open", statusCode: 400 }, 400);
  }

  const entry = await prisma.tournamentEntry.findUnique({
    where: { tournamentId_userId: { tournamentId, userId: user.id } },
  });
  if (!entry) return c.json({ error: "Not registered", statusCode: 404 }, 404);

  await prisma.tournamentEntry.delete({ where: { id: entry.id } });
  return c.json({ message: "Withdrawn successfully" });
});

// ─── Commissioner Registration Management ────────────────────────────────────

// POST /tournaments/:id/entries — commissioner adds player
tournaments.post("/:id/entries", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  const body = await c.req.json();

  const entry = await prisma.tournamentEntry.create({
    data: {
      tournamentId: tournamentId!,
      userId: body.userId,
      flight: body.flight ?? null,
      tee: body.tee ?? null,
      paymentStatus: body.paymentStatus ?? "PENDING",
    },
  });
  return c.json(entry, 201);
});

// DELETE /tournaments/:id/entries/:entryId — commissioner removes player
tournaments.delete("/:id/entries/:entryId", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const entryId = c.req.param("entryId");
  await prisma.tournamentEntry.delete({ where: { id: entryId } });
  return c.json({ message: "Entry removed" });
});

// GET /tournaments/:id/entries — list entries
tournaments.get("/:id/entries", async (c) => {
  const tournamentId = c.req.param("id");
  const entries = await prisma.tournamentEntry.findMany({
    where: { tournamentId },
    include: {
      user: { select: { id: true, firstName: true, lastName: true, avatarUrl: true, ghinIndex: true } },
    },
    orderBy: { createdAt: "asc" },
  });
  return c.json({ entries });
});

// PUT /tournaments/:id/entries/:entryId — override flight
tournaments.put("/:id/entries/:entryId", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const entryId = c.req.param("entryId");
  const body = await c.req.json();
  const updated = await prisma.tournamentEntry.update({
    where: { id: entryId },
    data: { flight: body.flight ?? undefined, tee: body.tee ?? undefined },
  });
  return c.json(updated);
});


// ─── Pairing & Bracket Endpoints ─────────────────────────────────────────────

// POST /tournaments/:id/pairings — generate stroke play pairings
tournaments.post("/:id/pairings", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  const body = await c.req.json().catch(() => ({}));
  const groupSize = body.groupSize ?? 4;

  const entries = await prisma.tournamentEntry.findMany({
    where: { tournamentId },
    include: { user: { select: { ghinIndex: true } } },
  });

  const seedEntries: SeedEntry[] = entries.map((e) => ({
    entryId: e.id,
    userId: e.userId,
    ghinIndex: e.user.ghinIndex,
    manualSeed: e.seedPosition ?? undefined,
  }));

  const result = generateStrokePlayPairings(seedEntries, groupSize);

  // Persist pairings
  for (const group of result.groups) {
    const pairing = await prisma.pairing.create({
      data: {
        tournamentId: tournamentId!,
        roundNumber: result.roundNumber,
        groupNumber: group.groupNumber,
      },
    });
    for (let i = 0; i < group.entryIds.length; i++) {
      await prisma.pairingSlot.create({
        data: { pairingId: pairing.id, entryId: group.entryIds[i]!, slotOrder: i + 1 },
      });
    }
  }

  return c.json({ pairings: result });
});

// POST /tournaments/:id/bracket — generate bracket
tournaments.post("/:id/bracket", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);

  const bracketType = tournament.bracketType as "SINGLE_ELIMINATION" | "DOUBLE_ELIMINATION" | null;
  if (!bracketType || bracketType === "ROUND_ROBIN" as any) {
    return c.json({ error: "Tournament does not have a bracket type configured", statusCode: 400 }, 400);
  }

  const entries = await prisma.tournamentEntry.findMany({
    where: { tournamentId },
    include: { user: { select: { ghinIndex: true } } },
  });

  const seedEntries: SeedEntry[] = entries.map((e) => ({
    entryId: e.id,
    userId: e.userId,
    ghinIndex: e.user.ghinIndex,
    manualSeed: e.seedPosition ?? undefined,
  }));

  const matches = generateBracket(seedEntries, bracketType);

  // Persist bracket matches
  for (const match of matches) {
    await prisma.bracketMatch.create({
      data: {
        tournamentId: tournamentId!,
        roundNumber: match.roundNumber,
        matchNumber: match.matchNumber,
        entry1Id: match.entry1Id,
        entry2Id: match.entry2Id,
        isBye: match.isBye,
        bracketSide: match.bracketSide ?? null,
      },
    });
  }

  return c.json({ bracket: matches });
});

// POST /tournaments/:id/pairings/publish — publish draw
tournaments.post("/:id/pairings/publish", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  // Transition to IN_PROGRESS if currently REGISTRATION_OPEN
  const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);

  if (tournament.status === "REGISTRATION_OPEN") {
    await prisma.tournament.update({ where: { id: tournamentId }, data: { status: "IN_PROGRESS" } });
  }

  return c.json({ message: "Pairings published", tournamentId });
});

// POST /tournaments/:id/bracket/publish — publish bracket
tournaments.post("/:id/bracket/publish", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);

  if (tournament.status === "REGISTRATION_OPEN") {
    await prisma.tournament.update({ where: { id: tournamentId }, data: { status: "IN_PROGRESS" } });
  }

  return c.json({ message: "Bracket published", tournamentId });
});


// ─── Commissioner Dashboard Endpoints ────────────────────────────────────────

// POST /tournaments/:id/announce — send announcement
tournaments.post("/:id/announce", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  const internalUserId = c.get("internalUserId") as string;
  const body = await c.req.json();
  const text = body.text || body.message;

  if (!text) return c.json({ error: "Announcement text is required", statusCode: 400 }, 400);

  const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);

  // Emit FeedEvent
  await prisma.feedEvent.create({
    data: {
      eventType: "TOURNAMENT_ANNOUNCEMENT",
      actorId: internalUserId,
      organizationId: tournament.organizationId,
      payload: { tournamentId, tournamentName: tournament.name, text },
    },
  });

  // 27.3: Wire announcement to push notifications
  // Fetch all registered players' user IDs for push targeting
  const registeredEntries = await prisma.tournamentEntry.findMany({
    where: { tournamentId },
    select: { userId: true },
  });
  const playerIds = registeredEntries.map((e) => e.userId);

  // Send push notification via OneSignal (or equivalent)
  if (playerIds.length > 0) {
    try {
      // Broadcast via Supabase Realtime as well for in-app delivery
      const channel = supabaseAdmin.channel(`tournament:${tournamentId}`);
      await channel.send({
        type: "broadcast",
        event: "announcement",
        payload: { text, tournamentName: tournament.name, sentAt: new Date().toISOString() },
      });
      supabaseAdmin.removeChannel(channel);
    } catch {
      // Non-critical: push failure shouldn't block announcement
    }
  }

  return c.json({ message: "Announcement sent", tournamentId, recipientCount: playerIds.length });
});

// POST /tournaments/:id/finalize — finalize results
tournaments.post("/:id/finalize", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  const internalUserId = c.get("internalUserId") as string;

  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: { entries: { include: { user: true } } },
  });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);
  if (tournament.status !== "IN_PROGRESS") {
    return c.json({ error: "Tournament must be IN_PROGRESS to finalize", statusCode: 400 }, 400);
  }

  // Rank entries by scoreRelToPar ascending
  const ranked = [...tournament.entries].sort((a, b) => a.scoreRelToPar - b.scoreRelToPar);

  // Update tournament status
  await prisma.tournament.update({
    where: { id: tournamentId },
    data: { status: "COMPLETED" },
  });

  // Emit FeedEvent with top finishers
  const topFinishers = ranked.slice(0, 3).map((e, i) => ({
    position: i + 1,
    name: `${e.user.firstName} ${e.user.lastName}`,
    scoreRelToPar: e.scoreRelToPar,
  }));

  await prisma.feedEvent.create({
    data: {
      eventType: "TOURNAMENT_RESULT",
      actorId: internalUserId,
      organizationId: tournament.organizationId,
      payload: { tournamentId, tournamentName: tournament.name, topFinishers },
    },
  });

  // If tournament belongs to a season, recompute season standings
  if (tournament.seasonId) {
    const season = await prisma.season.findUnique({
      where: { id: tournament.seasonId },
      include: {
        tournaments: {
          where: { status: "COMPLETED" },
          include: { entries: { include: { user: true } } },
        },
      },
    });

    if (season && season.pointsSystem) {
      const finalizedTournaments: FinalizedTournament[] = season.tournaments.map((t) => ({
        id: t.id,
        entries: t.entries.map((e) => ({
          userId: e.userId,
          firstName: e.user.firstName,
          lastName: e.user.lastName,
          scoreRelToPar: e.scoreRelToPar,
          score: e.score,
        })),
      }));

      const standings = computeSeasonStandings(
        finalizedTournaments,
        season.pointsSystem as unknown as PointsSystemConfig,
        season.dropWorstRounds ?? 0,
      );

      await prisma.season.update({
        where: { id: season.id },
        data: { standingsCache: standings as any },
      });
    }
  }

  return c.json({ message: "Tournament finalized", topFinishers });
});

// ─── Score Disputes ──────────────────────────────────────────────────────────

// POST /tournaments/:id/disputes — player submits dispute
tournaments.post("/:id/disputes", async (c) => {
  const tournamentId = c.req.param("id");
  const authId = c.get("userId") as string;
  const user = await getInternalUser(authId);
  if (!user) return c.json({ error: "User not found", statusCode: 404 }, 404);

  const body = await c.req.json();
  const entry = await prisma.tournamentEntry.findUnique({
    where: { tournamentId_userId: { tournamentId, userId: user.id } },
  });
  if (!entry) return c.json({ error: "Not registered in this tournament", statusCode: 404 }, 404);

  const dispute = await prisma.scoreDispute.create({
    data: {
      tournamentId,
      entryId: entry.id,
      holeNumber: body.holeNumber,
      claimedScore: body.claimedScore,
      recordedScore: body.recordedScore,
      evidenceUrl: body.evidenceUrl ?? null,
      status: "OPEN",
    },
  });
  return c.json(dispute, 201);
});

// GET /tournaments/:id/disputes — list disputes
tournaments.get("/:id/disputes", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  const disputes = await prisma.scoreDispute.findMany({
    where: { tournamentId },
    include: {
      entry: { include: { user: { select: { firstName: true, lastName: true } } } },
      resolvedBy: { select: { firstName: true, lastName: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return c.json({ disputes });
});

// PUT /tournaments/:id/disputes/:disputeId — resolve dispute
tournaments.put("/:id/disputes/:disputeId", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  const disputeId = c.req.param("disputeId");
  const internalUserId = c.get("internalUserId") as string;
  const body = await c.req.json();

  const dispute = await prisma.scoreDispute.update({
    where: { id: disputeId },
    data: {
      status: body.status ?? "RESOLVED",
      resolvedById: internalUserId,
      resolutionNotes: body.resolutionNotes ?? null,
    },
    include: {
      entry: { include: { user: { select: { id: true, firstName: true, lastName: true } } } },
    },
  });

  // 27.4: If dispute accepted (RESOLVED), update the player's score
  if (body.status === "RESOLVED" && dispute.claimedScore != null) {
    // Find the round for this player in this tournament
    const roundPlayer = await prisma.roundPlayer.findFirst({
      where: { userId: dispute.entry.userId, round: { tournamentId } },
      include: { round: true },
    });

    if (roundPlayer) {
      // Update the hole score to the claimed value
      await prisma.hole.upsert({
        where: { roundId_holeNumber: { roundId: roundPlayer.roundId, holeNumber: dispute.holeNumber } },
        update: { strokes: dispute.claimedScore },
        create: { roundId: roundPlayer.roundId, holeNumber: dispute.holeNumber, strokes: dispute.claimedScore },
      });

      // Create audit log for the score change
      await prisma.scoreAuditLog.create({
        data: {
          tournamentId: tournamentId!,
          entryId: dispute.entryId,
          holeNumber: dispute.holeNumber,
          originalValue: dispute.recordedScore,
          newValue: dispute.claimedScore,
          editedById: internalUserId,
        },
      });

      // Recompute entry totals
      const allHoles = await prisma.hole.findMany({ where: { roundId: roundPlayer.roundId } });
      const totalScore = allHoles.reduce((sum, h) => sum + h.strokes, 0);
      const scoreRelToPar = totalScore - roundPlayer.round.coursePar;

      await prisma.tournamentEntry.update({
        where: { id: dispute.entryId },
        data: { score: totalScore, scoreRelToPar, thru: allHoles.length },
      });
    }
  }

  // 27.4: Emit SCORE_DISPUTE_RESOLVED FeedEvent and notify player
  const tournament = await prisma.tournament.findUnique({ where: { id: tournamentId } });
  if (tournament) {
    await prisma.feedEvent.create({
      data: {
        eventType: "SCORE_DISPUTE_RESOLVED",
        actorId: internalUserId,
        organizationId: tournament.organizationId,
        payload: {
          tournamentId,
          tournamentName: tournament.name,
          disputeId: dispute.id,
          holeNumber: dispute.holeNumber,
          resolution: body.status ?? "RESOLVED",
          playerName: `${dispute.entry.user.firstName} ${dispute.entry.user.lastName}`,
        },
      },
    });

    // Push notification to the disputing player via Realtime
    try {
      const channel = supabaseAdmin.channel(`user:${dispute.entry.userId}`);
      await channel.send({
        type: "broadcast",
        event: "dispute_resolved",
        payload: {
          disputeId: dispute.id,
          tournamentName: tournament.name,
          holeNumber: dispute.holeNumber,
          resolution: body.status ?? "RESOLVED",
          notes: body.resolutionNotes ?? null,
        },
      });
      supabaseAdmin.removeChannel(channel);
    } catch {
      // Non-critical
    }
  }

  return c.json(dispute);
});


// ─── Manual Score Edit with Audit ────────────────────────────────────────────

// PUT /tournaments/:id/entries/:entryId/scores — manual score edit
tournaments.put("/:id/entries/:entryId/scores", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  const entryId = c.req.param("entryId");
  const internalUserId = c.get("internalUserId") as string;
  const body = await c.req.json();

  // body.scores: { holeNumber: number, strokes: number }[]
  const scores: { holeNumber: number; strokes: number }[] = body.scores;
  if (!Array.isArray(scores)) {
    return c.json({ error: "scores must be an array of { holeNumber, strokes }", statusCode: 400 }, 400);
  }

  const entry = await prisma.tournamentEntry.findUnique({ where: { id: entryId } });
  if (!entry) return c.json({ error: "Entry not found", statusCode: 404 }, 404);

  // Find the round for this tournament and player
  const roundPlayer = await prisma.roundPlayer.findFirst({
    where: { userId: entry.userId, round: { tournamentId } },
    include: { round: { include: { holes: true } } },
  });

  for (const s of scores) {
    const existingHole = roundPlayer?.round.holes.find((h) => h.holeNumber === s.holeNumber);
    const originalValue = existingHole?.strokes ?? 0;

    // Create audit log
    await prisma.scoreAuditLog.create({
      data: {
        tournamentId: tournamentId!,
        entryId: entryId!,
        holeNumber: s.holeNumber,
        originalValue,
        newValue: s.strokes,
        editedById: internalUserId,
      },
    });

    // Update the hole record if round exists
    if (roundPlayer) {
      await prisma.hole.upsert({
        where: { roundId_holeNumber: { roundId: roundPlayer.roundId, holeNumber: s.holeNumber } },
        update: { strokes: s.strokes },
        create: { roundId: roundPlayer.roundId, holeNumber: s.holeNumber, strokes: s.strokes },
      });
    }
  }

  // Recompute entry totals
  if (roundPlayer) {
    const allHoles = await prisma.hole.findMany({ where: { roundId: roundPlayer.roundId } });
    const totalScore = allHoles.reduce((sum, h) => sum + h.strokes, 0);
    const coursePar = roundPlayer.round.coursePar;
    const scoreRelToPar = totalScore - coursePar;

    await prisma.tournamentEntry.update({
      where: { id: entryId },
      data: {
        score: totalScore,
        scoreRelToPar,
        thru: allHoles.length,
      },
    });
  }

  return c.json({ message: "Scores updated with audit trail" });
});

// ─── Leaderboard ─────────────────────────────────────────────────────────────

// GET /tournaments/:id/leaderboard — ranked entries
tournaments.get("/:id/leaderboard", async (c) => {
  const tournamentId = c.req.param("id");
  const flightFilter = c.req.query("flight");
  const scoring = c.req.query("scoring"); // "net" or "gross"

  const where: Record<string, unknown> = { tournamentId };
  if (flightFilter) where.flight = flightFilter;

  const entries = await prisma.tournamentEntry.findMany({
    where,
    include: {
      user: { select: { id: true, firstName: true, lastName: true, avatarUrl: true } },
    },
  });

  // Sort by the appropriate score
  const sorted = [...entries].sort((a, b) => {
    if (scoring === "net") {
      return (a.netScore ?? a.scoreRelToPar) - (b.netScore ?? b.scoreRelToPar);
    }
    return a.scoreRelToPar - b.scoreRelToPar;
  });

  const leaderboard = sorted.map((entry, idx) => ({
    rank: idx + 1,
    entryId: entry.id,
    userId: entry.userId,
    firstName: entry.user.firstName,
    lastName: entry.user.lastName,
    avatarUrl: entry.user.avatarUrl,
    flight: entry.flight,
    scoreRelToPar: entry.scoreRelToPar,
    grossScore: entry.score,
    netScore: entry.netScore,
    thru: entry.thru,
    matchResult: entry.matchResult,
    eliminationStatus: entry.eliminationStatus,
  }));

  return c.json({ leaderboard });
});

// POST /tournaments/:id/leaderboard/freeze
tournaments.post("/:id/leaderboard/freeze", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  await prisma.tournament.update({ where: { id: tournamentId }, data: { leaderboardFrozen: true } });
  return c.json({ message: "Leaderboard frozen" });
});

// POST /tournaments/:id/leaderboard/unfreeze
tournaments.post("/:id/leaderboard/unfreeze", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");
  await prisma.tournament.update({ where: { id: tournamentId }, data: { leaderboardFrozen: false } });

  // Broadcast reconciliation: send current leaderboard state
  const entries = await prisma.tournamentEntry.findMany({
    where: { tournamentId },
    include: { user: { select: { firstName: true, lastName: true } } },
    orderBy: { scoreRelToPar: "asc" },
  });

  try {
    const channel = supabaseAdmin.channel(`tournament:${tournamentId}`);
    await channel.send({
      type: "broadcast",
      event: "leaderboard_update",
      payload: {
        type: "reconcile",
        entries: entries.map((e, i) => ({
          rank: i + 1,
          entryId: e.id,
          name: `${e.user.firstName} ${e.user.lastName}`,
          scoreRelToPar: e.scoreRelToPar,
          thru: e.thru,
        })),
      },
    });
    supabaseAdmin.removeChannel(channel);
  } catch {
    // Non-critical: broadcast failure shouldn't block unfreeze
  }

  return c.json({ message: "Leaderboard unfrozen and reconciled" });
});


// ─── Export Endpoints ────────────────────────────────────────────────────────

// GET /tournaments/:id/export/csv
tournaments.get("/:id/export/csv", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");

  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: {
      organization: { select: { name: true } },
      entries: {
        include: { user: { select: { firstName: true, lastName: true, ghinIndex: true } } },
        orderBy: { scoreRelToPar: "asc" },
      },
    },
  });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);

  const exportEntries: ExportEntry[] = tournament.entries.map((e, idx) => ({
    rank: idx + 1,
    playerName: `${e.user.firstName} ${e.user.lastName}`,
    handicap: e.user.ghinIndex,
    flight: e.flight,
    grossScore: e.score,
    netScore: e.netScore,
    holeScores: [], // Would need to join with Hole records for full detail
  }));

  const data: TournamentExportData = {
    name: tournament.name,
    startDate: tournament.startDate?.toISOString() ?? null,
    endDate: tournament.endDate?.toISOString() ?? null,
    organizationName: tournament.organization.name,
    entries: exportEntries,
  };

  const csv = generateCSV(data);

  c.header("Content-Type", "text/csv");
  c.header("Content-Disposition", `attachment; filename="${tournament.name.replace(/[^a-zA-Z0-9]/g, "_")}_results.csv"`);
  return c.body(csv);
});

// GET /tournaments/:id/export/pdf
tournaments.get("/:id/export/pdf", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const tournamentId = c.req.param("id");

  const tournament = await prisma.tournament.findUnique({
    where: { id: tournamentId },
    include: {
      organization: { select: { name: true, colorScheme: true } },
      entries: {
        include: { user: { select: { firstName: true, lastName: true, ghinIndex: true } } },
        orderBy: { scoreRelToPar: "asc" },
      },
    },
  });
  if (!tournament) return c.json({ error: "Tournament not found", statusCode: 404 }, 404);

  const exportEntries: ExportEntry[] = tournament.entries.map((e, idx) => ({
    rank: idx + 1,
    playerName: `${e.user.firstName} ${e.user.lastName}`,
    handicap: e.user.ghinIndex,
    flight: e.flight,
    grossScore: e.score,
    netScore: e.netScore,
    holeScores: [],
  }));

  const data: TournamentExportData = {
    name: tournament.name,
    startDate: tournament.startDate?.toISOString() ?? null,
    endDate: tournament.endDate?.toISOString() ?? null,
    organizationName: tournament.organization.name,
    entries: exportEntries,
  };

  const orgConfig = tournament.organization.colorScheme as { primary?: string; secondary?: string; accent?: string } | null;
  const pdfBuffer = await generatePDF(data, orgConfig);

  c.header("Content-Type", "application/pdf");
  c.header("Content-Disposition", `attachment; filename="${tournament.name.replace(/[^a-zA-Z0-9]/g, "_")}_results.pdf"`);
  return c.body(new Uint8Array(pdfBuffer));
});

export default tournaments;
