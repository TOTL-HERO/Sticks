import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";

type Env = { Variables: { userId: string } };

const rounds = new Hono<Env>();

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
    },
    create: {
      roundId,
      holeNumber,
      strokes: body.strokes ?? 0,
      putts: body.putts ?? 0,
      penalties: body.penalties ?? 0,
      gpsTimestamp: body.gpsTimestamp ? new Date(body.gpsTimestamp) : null,
      par: body.par ?? null,
    },
  });

  return c.json(hole);
});

// POST /rounds/:id/finalize — finalize round, compute scores, emit FeedEvent
rounds.post("/:id/finalize", async (c) => {
  const authId = c.get("userId") as string;
  const roundId = c.req.param("id");

  const round = await prisma.round.findUnique({
    where: { id: roundId },
    include: { holes: true, players: { include: { user: true } } },
  });

  if (!round) {
    return c.json({ error: "Round not found", statusCode: 404 }, 404);
  }

  if (round.isFinalized) {
    return c.json({ error: "Round already finalized", statusCode: 400 }, 400);
  }

  const totalScore = round.holes.reduce((sum, h) => sum + h.strokes, 0);
  const scoreRelToPar = totalScore - round.coursePar;

  const updated = await prisma.round.update({
    where: { id: roundId },
    data: {
      endedAt: new Date(),
      totalScore,
      scoreRelToPar,
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
