// ─── Season Standings Computation Service ────────────────────────────────────

export interface PointsSystemConfig {
  positions: { position: number; points: number }[];
}

export interface FinalizedTournament {
  id: string;
  entries: {
    userId: string;
    firstName: string;
    lastName: string;
    scoreRelToPar: number;
    score: number | null;
  }[];
}

export interface StandingsEntry {
  userId: string;
  firstName: string;
  lastName: string;
  totalPoints: number;
  eventsPlayed: number;
  eventsCounted: number;
  rank: number;
}

/**
 * Computes season standings from finalized tournaments.
 *
 * 1. For each tournament, rank entries by scoreRelToPar ascending.
 * 2. Map finishing positions to points using the points system config.
 * 3. For each player, collect all point values.
 * 4. If dropWorstRounds > 0, drop the lowest N point values.
 * 5. Sum remaining points. Rank by total descending.
 */
export function computeSeasonStandings(
  tournaments: FinalizedTournament[],
  pointsSystem: PointsSystemConfig,
  dropWorstRounds: number = 0,
): StandingsEntry[] {
  // Build a points lookup: position → points
  const pointsMap = new Map<number, number>();
  for (const p of pointsSystem.positions) {
    pointsMap.set(p.position, p.points);
  }

  // Collect per-player points across all tournaments
  const playerData = new Map<
    string,
    { firstName: string; lastName: string; points: number[] }
  >();

  for (const tournament of tournaments) {
    // Rank entries by scoreRelToPar ascending (lower is better)
    const ranked = [...tournament.entries].sort(
      (a, b) => a.scoreRelToPar - b.scoreRelToPar,
    );

    ranked.forEach((entry, idx) => {
      const position = idx + 1;
      const pts = pointsMap.get(position) ?? 0;

      if (!playerData.has(entry.userId)) {
        playerData.set(entry.userId, {
          firstName: entry.firstName,
          lastName: entry.lastName,
          points: [],
        });
      }
      playerData.get(entry.userId)!.points.push(pts);
    });
  }

  // Compute totals with drop-worst logic
  const standings: StandingsEntry[] = [];

  for (const [userId, data] of playerData) {
    const allPoints = [...data.points].sort((a, b) => a - b); // ascending
    const dropCount = Math.min(dropWorstRounds, Math.max(0, allPoints.length - 1));
    const counted = allPoints.slice(dropCount);
    const totalPoints = counted.reduce((sum, p) => sum + p, 0);

    standings.push({
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      totalPoints,
      eventsPlayed: data.points.length,
      eventsCounted: counted.length,
      rank: 0, // assigned below
    });
  }

  // Rank by total points descending
  standings.sort((a, b) => b.totalPoints - a.totalPoints);
  standings.forEach((entry, idx) => {
    entry.rank = idx + 1;
  });

  return standings;
}
