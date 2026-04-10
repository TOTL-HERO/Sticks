import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";
import { orgRoleMiddleware } from "../middleware/orgRole.ts";
import { computeSeasonStandings, type FinalizedTournament, type PointsSystemConfig } from "../services/seasonService.ts";

type Env = { Variables: { userId: string; orgRole?: string; internalUserId?: string } };

const seasons = new Hono<Env>();

// POST /seasons — create season
seasons.post("/", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const body = await c.req.json();
  const season = await prisma.season.create({
    data: {
      organizationId: body.organizationId,
      name: body.name,
      startDate: body.startDate ? new Date(body.startDate) : null,
      endDate: body.endDate ? new Date(body.endDate) : null,
      pointsSystem: body.pointsSystem ?? null,
      dropWorstRounds: body.dropWorstRounds ?? null,
    },
  });
  return c.json(season, 201);
});

// GET /seasons/:id — detail with tournament schedule
seasons.get("/:id", async (c) => {
  const id = c.req.param("id");
  const season = await prisma.season.findUnique({
    where: { id },
    include: {
      tournaments: {
        select: { id: true, name: true, status: true, startDate: true, endDate: true, format: true },
        orderBy: { startDate: "asc" },
      },
      organization: { select: { name: true } },
    },
  });
  if (!season) return c.json({ error: "Season not found", statusCode: 404 }, 404);
  return c.json(season);
});

// PUT /seasons/:id — update
seasons.put("/:id", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();

  const existing = await prisma.season.findUnique({ where: { id } });
  if (!existing) return c.json({ error: "Season not found", statusCode: 404 }, 404);
  if (existing.finalized) return c.json({ error: "Season is finalized", statusCode: 400 }, 400);

  const updated = await prisma.season.update({
    where: { id },
    data: {
      name: body.name ?? existing.name,
      startDate: body.startDate ? new Date(body.startDate) : existing.startDate,
      endDate: body.endDate ? new Date(body.endDate) : existing.endDate,
      pointsSystem: body.pointsSystem !== undefined ? body.pointsSystem : existing.pointsSystem,
      dropWorstRounds: body.dropWorstRounds !== undefined ? body.dropWorstRounds : existing.dropWorstRounds,
    },
  });
  return c.json(updated);
});

// GET /seasons/:id/standings — standings
seasons.get("/:id/standings", async (c) => {
  const id = c.req.param("id");
  const season = await prisma.season.findUnique({
    where: { id },
    include: {
      tournaments: {
        where: { status: "COMPLETED" },
        include: { entries: { include: { user: true } } },
      },
    },
  });
  if (!season) return c.json({ error: "Season not found", statusCode: 404 }, 404);

  // Return cached standings if available and season is finalized
  if (season.finalized && season.standingsCache) {
    return c.json({ standings: season.standingsCache, cached: true });
  }

  // Compute on-demand
  if (!season.pointsSystem) {
    return c.json({ standings: [], message: "No points system configured" });
  }

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

  return c.json({ standings, cached: false });
});

// POST /seasons/:id/finalize — lock standings
seasons.post("/:id/finalize", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const id = c.req.param("id");
  const season = await prisma.season.findUnique({
    where: { id },
    include: {
      tournaments: {
        where: { status: "COMPLETED" },
        include: { entries: { include: { user: true } } },
      },
    },
  });
  if (!season) return c.json({ error: "Season not found", statusCode: 404 }, 404);
  if (season.finalized) return c.json({ error: "Season already finalized", statusCode: 400 }, 400);

  let standingsCache: any = null;
  if (season.pointsSystem) {
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

    standingsCache = computeSeasonStandings(
      finalizedTournaments,
      season.pointsSystem as unknown as PointsSystemConfig,
      season.dropWorstRounds ?? 0,
    );
  }

  await prisma.season.update({
    where: { id },
    data: { finalized: true, standingsCache },
  });

  return c.json({ message: "Season finalized", standings: standingsCache });
});

// POST /seasons/:id/roster — add player
seasons.post("/:id/roster", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const seasonId = c.req.param("id");
  const body = await c.req.json();

  const season = await prisma.season.findUnique({ where: { id: seasonId } });
  if (!season) return c.json({ error: "Season not found", statusCode: 404 }, 404);

  // Ensure user has org membership
  const membership = await prisma.orgMembership.findUnique({
    where: {
      organizationId_userId: { organizationId: season.organizationId, userId: body.userId },
    },
  });

  if (!membership) {
    // Create PLAYER membership
    await prisma.orgMembership.create({
      data: { organizationId: season.organizationId, userId: body.userId, role: "PLAYER" },
    });
  }

  return c.json({ message: "Player added to season roster", userId: body.userId });
});

// DELETE /seasons/:id/roster/:userId — remove player
seasons.delete("/:id/roster/:userId", orgRoleMiddleware(["COMMISSIONER", "ADMIN"]), async (c) => {
  const userId = c.req.param("userId");
  // Note: we don't remove org membership, just acknowledge removal from season context
  return c.json({ message: "Player removed from season roster", userId });
});

export default seasons;
