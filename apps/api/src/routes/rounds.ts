import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";

type Env = { Variables: { userId: string } };

const rounds = new Hono<Env>();

// ─── Track Integrity ─────────────────────────────────────────────────────────

interface ShotRecord {
  holeNumber: number;
  eventType: string;
  timestamp: Date;
}

interface HoleRecord {
  strokes: number;
}

export function computeTrackIntegrity(
  shots: ShotRecord[],
  holes: HoleRecord[],
  totalHoles: number,
): number {
  const countableTypes = new Set(["DETECTED", "MANUAL", "CORRECTED"]);
  const totalStrokes = holes.reduce((sum, h) => sum + h.strokes, 0);
  const totalShots = shots.filter((s) => countableTypes.has(s.eventType)).length;

  // Coverage: how many of the 18 holes have at least one shot point
  const holesWithShots = new Set(shots.map((s) => s.holeNumber)).size;
  const coverageRatio = totalHoles > 0 ? holesWithShots / totalHoles : 0;

  // Shot match: ratio of tracked shots to confirmed strokes
  const shotMatchRatio =
    totalStrokes > 0 ? Math.min(totalShots / totalStrokes, 1.0) : 0;

  // Time gap penalty: check for gaps > 10 minutes between consecutive shots
  const sorted = [...shots].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
  let gapPenalty = 0;
  for (let i = 1; i < sorted.length; i++) {
    const gap =
      new Date(sorted[i].timestamp).getTime() -
      new Date(sorted[i - 1].timestamp).getTime();
    if (gap > 10 * 60 * 1000) gapPenalty += 0.05;
  }

  const raw =
    coverageRatio * 0.4 +
    shotMatchRatio * 0.5 +
    0.1 * (gapPenalty === 0 ? 1 : 0);
  return Math.max(0, Math.min(1, raw - gapPenalty));
}

// POST /rounds — create Round + RoundPlayer
rounds.post("/", async (c) => {
  const authId = c.get("userId") as string;
  const body = await c.req.json();

  const user = await prisma.user.findUnique({ where: { authId } });
  if (!user) {
    return c.json({ error: "User not found", statusCode: 404 }, 404);
  }

  const round = await prisma.round.create({
    data: {
      courseName: body.courseName,
      courseId: body.courseId ?? null,
      coursePar: body.coursePar ?? 72,
      scoringMode: body.scoringMode ?? "STROKE_PLAY",
      players: {
        create: { userId: user.id },
      },
    },
  });

  return c.json({ id: round.id }, 201);
});

// PUT /rounds/:id/holes/:num — upsert Hole record
rounds.put("/:id/holes/:num", async (c) => {
  const roundId = c.req.param("id");
  const holeNumber = parseInt(c.req.param("num"), 10);
  const body = await c.req.json();

  if (isNaN(holeNumber) || holeNumber < 1) {
    return c.json({ error: "Invalid hole number", statusCode: 400 }, 400);
  }

  const hole = await prisma.hole.upsert({
    where: {
      roundId_holeNumber: { roundId, holeNumber },
    },
    update: {
      strokes: body.strokes ?? 0,
      putts: body.putts ?? 0,
      penalties: body.penalties ?? 0,
      gpsTimestamp: body.gpsTimestamp ? new Date(body.gpsTimestamp) : undefined,
      par: body.par ?? undefined,
      fairwayHit: body.fairwayHit ?? undefined,
      gir: body.gir ?? undefined,
    },
    create: {
      roundId,
      holeNumber,
      strokes: body.strokes ?? 0,
      putts: body.putts ?? 0,
      penalties: body.penalties ?? 0,
      gpsTimestamp: body.gpsTimestamp ? new Date(body.gpsTimestamp) : null,
      par: body.par ?? null,
      fairwayHit: body.fairwayHit ?? null,
      gir: body.gir ?? null,
    },
  });

  return c.json(hole);
});

// POST /rounds/:id/shots — batch upload shot points (Task 4.1)
rounds.post("/:id/shots", async (c) => {
  const roundId = c.req.param("id");
  const body = await c.req.json();

  const round = await prisma.round.findUnique({ where: { id: roundId } });
  if (!round) {
    return c.json({ error: "Round not found", statusCode: 404 }, 404);
  }

  if (round.isFinalized) {
    return c.json({ error: "Round is finalized", statusCode: 409 }, 409);
  }

  const shots: unknown[] = body.shots;
  if (!Array.isArray(shots) || shots.length === 0) {
    return c.json({ error: "shots must be a non-empty array", statusCode: 400 }, 400);
  }

  // Validate each shot
  for (const shot of shots as Record<string, unknown>[]) {
    const hn = shot.holeNumber as number;
    if (typeof hn !== "number" || hn < 1 || hn > 18 || !Number.isInteger(hn)) {
      return c.json(
        { error: `Invalid holeNumber: ${hn}`, statusCode: 400 },
        400,
      );
    }
  }

  // Upsert each shot by id for idempotent retries
  const results = await Promise.all(
    (shots as Record<string, unknown>[]).map((shot) =>
      prisma.shotTrack.upsert({
        where: { id: shot.id as string },
        update: {
          holeNumber: shot.holeNumber as number,
          shotNumber: shot.shotNumber as number,
          startLatitude: shot.startLatitude as number,
          startLongitude: shot.startLongitude as number,
          endLatitude: (shot.endLatitude as number) ?? null,
          endLongitude: (shot.endLongitude as number) ?? null,
          timestamp: new Date(shot.timestamp as string),
          eventType: shot.eventType as "DETECTED" | "MANUAL" | "CORRECTED" | "ROUND_START" | "ROUND_END",
          accuracy: shot.accuracy as number,
          altitude: (shot.altitude as number) ?? null,
        },
        create: {
          id: shot.id as string,
          roundId,
          holeNumber: shot.holeNumber as number,
          shotNumber: shot.shotNumber as number,
          startLatitude: shot.startLatitude as number,
          startLongitude: shot.startLongitude as number,
          endLatitude: (shot.endLatitude as number) ?? null,
          endLongitude: (shot.endLongitude as number) ?? null,
          timestamp: new Date(shot.timestamp as string),
          eventType: shot.eventType as "DETECTED" | "MANUAL" | "CORRECTED" | "ROUND_START" | "ROUND_END",
          accuracy: shot.accuracy as number,
          altitude: (shot.altitude as number) ?? null,
        },
      }),
    ),
  );

  return c.json({ count: results.length }, 201);
});

// GET /rounds/:id/shots — retrieve all shot points for a round (Task 4.2)
rounds.get("/:id/shots", async (c) => {
  const roundId = c.req.param("id");

  const round = await prisma.round.findUnique({ where: { id: roundId } });
  if (!round) {
    return c.json({ error: "Round not found", statusCode: 404 }, 404);
  }

  const shots = await prisma.shotTrack.findMany({
    where: { roundId },
    orderBy: [{ holeNumber: "asc" }, { shotNumber: "asc" }],
  });

  return c.json({ shots });
});

// POST /rounds/:id/finalize — finalize round, compute scores + trackIntegrity, emit FeedEvent
rounds.post("/:id/finalize", async (c) => {
  const authId = c.get("userId") as string;
  const roundId = c.req.param("id");

  const round = await prisma.round.findUnique({
    where: { id: roundId },
    include: { holes: true, shots: true, players: { include: { user: true } } },
  });

  if (!round) {
    return c.json({ error: "Round not found", statusCode: 404 }, 404);
  }

  if (round.isFinalized) {
    return c.json({ error: "Round already finalized", statusCode: 400 }, 400);
  }

  const totalScore = round.holes.reduce((sum, h) => sum + h.strokes, 0);
  const scoreRelToPar = totalScore - round.coursePar;
  const trackIntegrity = computeTrackIntegrity(round.shots, round.holes, 18);

  const updated = await prisma.round.update({
    where: { id: roundId },
    data: {
      endedAt: new Date(),
      totalScore,
      scoreRelToPar,
      trackIntegrity,
      isFinalized: true,
    },
  });

  // Find the user record for the actor
  const player = round.players.find((p) => p.user.authId === authId);
  if (player) {
    await prisma.feedEvent.create({
      data: {
        eventType: "ROUND_COMPLETED",
        actorId: player.userId,
        payload: {
          courseName: round.courseName,
          totalScore,
          scoreRelToPar,
          trackIntegrity,
        },
      },
    });
  }

  return c.json(updated);
});

// GET /rounds/me — current user's rounds with cursor pagination
rounds.get("/me", async (c) => {
  const authId = c.get("userId") as string;
  const cursor = c.req.query("cursor");
  const limit = Math.min(parseInt(c.req.query("limit") || "20", 10), 100);

  const user = await prisma.user.findUnique({ where: { authId } });
  if (!user) {
    return c.json({ error: "User not found", statusCode: 404 }, 404);
  }

  const roundPlayers = await prisma.roundPlayer.findMany({
    where: { userId: user.id },
    include: {
      round: {
        include: { holes: { orderBy: { holeNumber: "asc" } } },
      },
    },
    orderBy: { round: { startedAt: "desc" } },
    take: limit + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
  });

  const hasMore = roundPlayers.length > limit;
  const items = hasMore ? roundPlayers.slice(0, limit) : roundPlayers;
  const lastItem = items[items.length - 1];
  const nextCursor = hasMore && lastItem ? lastItem.id : null;

  return c.json({
    rounds: items.map((rp) => rp.round),
    nextCursor,
  });
});

// GET /rounds/:id — round detail with holes
rounds.get("/:id", async (c) => {
  const roundId = c.req.param("id");

  const round = await prisma.round.findUnique({
    where: { id: roundId },
    include: {
      holes: { orderBy: { holeNumber: "asc" } },
      players: {
        include: {
          user: {
            select: { id: true, firstName: true, lastName: true, avatarUrl: true },
          },
        },
      },
    },
  });

  if (!round) {
    return c.json({ error: "Round not found", statusCode: 404 }, 404);
  }

  return c.json(round);
});

export default rounds;
