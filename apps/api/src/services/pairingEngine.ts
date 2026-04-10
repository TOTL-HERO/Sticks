// ─── Pairing & Bracket Generation Engine ─────────────────────────────────────

export interface SeedEntry {
  entryId: string;
  userId: string;
  ghinIndex: number | null;
  manualSeed?: number;
}

export interface PairingGroup {
  groupNumber: number;
  entryIds: string[];
}

export interface PairingResult {
  roundNumber: number;
  groups: PairingGroup[];
}

export interface BracketMatchResult {
  roundNumber: number;
  matchNumber: number;
  entry1Id: string | null;
  entry2Id: string | null;
  isBye: boolean;
  bracketSide?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sortBySeed(entries: SeedEntry[]): SeedEntry[] {
  return [...entries].sort((a, b) => {
    if (a.manualSeed != null && b.manualSeed != null) return a.manualSeed - b.manualSeed;
    if (a.manualSeed != null) return -1;
    if (b.manualSeed != null) return 1;
    const aIdx = a.ghinIndex ?? 999;
    const bIdx = b.ghinIndex ?? 999;
    return aIdx - bIdx;
  });
}

function nextPowerOf2(n: number): number {
  let p = 1;
  while (p < n) p *= 2;
  return p;
}

// ─── Stroke Play Pairings ────────────────────────────────────────────────────

export function generateStrokePlayPairings(
  entries: SeedEntry[],
  groupSize: number = 4,
): PairingResult {
  const clampedSize = Math.max(2, Math.min(4, groupSize));
  const sorted = sortBySeed(entries);
  const groups: PairingGroup[] = [];
  let groupNum = 1;

  for (let i = 0; i < sorted.length; i += clampedSize) {
    const slice = sorted.slice(i, i + clampedSize);
    // If the last group has only 1 player, merge with previous group
    if (slice.length === 1 && groups.length > 0) {
      groups[groups.length - 1]!.entryIds.push(slice[0]!.entryId);
    } else {
      groups.push({ groupNumber: groupNum++, entryIds: slice.map((e) => e.entryId) });
    }
  }

  return { roundNumber: 1, groups };
}

// ─── Single Elimination Bracket ──────────────────────────────────────────────

export function generateSingleEliminationBracket(entries: SeedEntry[]): BracketMatchResult[] {
  const sorted = sortBySeed(entries);
  const n = sorted.length;
  const bracketSize = nextPowerOf2(n);
  const byeCount = bracketSize - n;

  // Build seeded positions: 1..bracketSize
  // Standard tournament seeding: match seed 1 vs bracketSize, 2 vs bracketSize-1, etc.
  const seeds: (SeedEntry | null)[] = new Array(bracketSize).fill(null);
  for (let i = 0; i < sorted.length; i++) {
    seeds[i] = sorted[i]!;
  }

  // Top seeds (indices 0..byeCount-1) get byes
  const matches: BracketMatchResult[] = [];
  const halfSize = bracketSize / 2;
  let matchNumber = 1;

  for (let i = 0; i < halfSize; i++) {
    const topSeedIdx = i;
    const bottomSeedIdx = bracketSize - 1 - i;
    const entry1 = seeds[topSeedIdx] ?? null;
    const entry2 = seeds[bottomSeedIdx] ?? null;
    const isBye = entry2 === null;

    matches.push({
      roundNumber: 1,
      matchNumber: matchNumber++,
      entry1Id: entry1?.entryId ?? null,
      entry2Id: entry2?.entryId ?? null,
      isBye,
      bracketSide: "winners",
    });
  }

  return matches;
}

// ─── Double Elimination Bracket ──────────────────────────────────────────────

export function generateDoubleEliminationBracket(entries: SeedEntry[]): BracketMatchResult[] {
  // Winners bracket is the same as single elimination round 1
  const winnerMatches = generateSingleEliminationBracket(entries).map((m) => ({
    ...m,
    bracketSide: "winners" as const,
  }));

  // Losers bracket round 1 is empty initially — populated as losers drop down
  // We create placeholder matches for the losers bracket
  const losersMatchCount = Math.ceil(winnerMatches.length / 2);
  const loserMatches: BracketMatchResult[] = [];
  for (let i = 0; i < losersMatchCount; i++) {
    loserMatches.push({
      roundNumber: 2,
      matchNumber: winnerMatches.length + i + 1,
      entry1Id: null,
      entry2Id: null,
      isBye: false,
      bracketSide: "losers",
    });
  }

  return [...winnerMatches, ...loserMatches];
}

// ─── Unified generateBracket ─────────────────────────────────────────────────

export function generateBracket(
  entries: SeedEntry[],
  bracketType: "SINGLE_ELIMINATION" | "DOUBLE_ELIMINATION",
): BracketMatchResult[] {
  if (bracketType === "DOUBLE_ELIMINATION") {
    return generateDoubleEliminationBracket(entries);
  }
  return generateSingleEliminationBracket(entries);
}

// ─── Round Robin Groups ──────────────────────────────────────────────────────

export function generateRoundRobinGroups(
  entries: SeedEntry[],
  groupCount: number,
): PairingResult {
  const sorted = sortBySeed(entries);
  const count = Math.max(2, groupCount);
  const groups: PairingGroup[] = [];

  for (let i = 0; i < count; i++) {
    groups.push({ groupNumber: i + 1, entryIds: [] });
  }

  // Snake-draft distribution for balanced groups
  sorted.forEach((entry, idx) => {
    const round = Math.floor(idx / count);
    const pos = round % 2 === 0 ? idx % count : count - 1 - (idx % count);
    groups[pos]!.entryIds.push(entry.entryId);
  });

  return { roundNumber: 1, groups: groups.filter((g) => g.entryIds.length > 0) };
}

// ─── Re-seed from Standings ──────────────────────────────────────────────────

export function reseedFromStandings(
  entries: SeedEntry[],
  standings: { entryId: string; score: number }[],
): SeedEntry[] {
  const standingsMap = new Map(standings.map((s) => [s.entryId, s.score]));

  return [...entries]
    .sort((a, b) => {
      const aScore = standingsMap.get(a.entryId) ?? Infinity;
      const bScore = standingsMap.get(b.entryId) ?? Infinity;
      return aScore - bScore;
    })
    .map((entry, idx) => ({ ...entry, manualSeed: idx + 1 }));
}
