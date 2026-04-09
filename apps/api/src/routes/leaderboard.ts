import { Hono } from "hono";
import { prisma } from "../lib/prisma.ts";

const leaderboard = new Hono();

// GET /leaderboard — best scoreRelToPar per user from finalized rounds
leaderboard.get("/", async (c) => {
  const period = c.req.query("period") || "all";

  let dateFilter: Date | undefined;
  const now = new Date();

  if (period === "week") {
    dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (period === "month") {
    dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }

  const whereClause: Record<string, unknown> = {
    isFinalized: true,
    scoreRelToPar: { not: null },
  };

  if (dateFilter) {
    whereClause.endedAt = { gte: dateFilter };
  }

  // Get all finalized rounds with their players
  const rounds = await prisma.round.findMany({
    where: whereClause,
    include: {
      players: {
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              avatarUrl: true,
            },
          },
        },
      },
    },
    orderBy: { scoreRelToPar: "asc" },
  });

  // Build best score per user
  const bestByUser = new Map<
    string,
    {
      userId: string;
      firstName: string;
      lastName: string;
      avatarUrl: string | null;
      scoreRelToPar: number;
      totalScore: number;
      courseName: string;
    }
  >();

  for (const round of rounds) {
    for (const rp of round.players) {
      const existing = bestByUser.get(rp.userId);
      if (!existing || round.scoreRelToPar! < existing.scoreRelToPar) {
        bestByUser.set(rp.userId, {
          userId: rp.userId,
          firstName: rp.user.firstName,
          lastName: rp.user.lastName,
          avatarUrl: rp.user.avatarUrl,
          scoreRelToPar: round.scoreRelToPar!,
          totalScore: round.totalScore!,
          courseName: round.courseName,
        });
      }
    }
  }

  // Sort and assign ranks
  const sorted = Array.from(bestByUser.values()).sort(
    (a, b) => a.scoreRelToPar - b.scoreRelToPar,
  );

  const leaderboardEntries = sorted.map((entry, index) => ({
    ...entry,
    rank: index + 1,
  }));

  return c.json({ leaderboard: leaderboardEntries });
});

export default leaderboard;
