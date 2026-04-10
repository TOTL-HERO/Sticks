import { describe, it, expect } from 'vitest';
import {
  generateStrokePlayPairings,
  generateSingleEliminationBracket,
  generateDoubleEliminationBracket,
  generateRoundRobinGroups,
  reseedFromStandings,
  type SeedEntry,
} from '../pairingEngine';

function makeSeed(id: string, ghin: number | null = null, seed?: number): SeedEntry {
  return { entryId: id, userId: `u-${id}`, ghinIndex: ghin, manualSeed: seed };
}

describe('Stroke Play Pairings', () => {
  it('groups players into groups of 4 by default', () => {
    const entries = Array.from({ length: 8 }, (_, i) => makeSeed(`e${i}`, i));
    const result = generateStrokePlayPairings(entries);
    expect(result.groups).toHaveLength(2);
    expect(result.groups[0].entryIds).toHaveLength(4);
    expect(result.groups[1].entryIds).toHaveLength(4);
  });

  it('merges last group if only 1 player', () => {
    const entries = Array.from({ length: 5 }, (_, i) => makeSeed(`e${i}`, i));
    const result = generateStrokePlayPairings(entries);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].entryIds).toHaveLength(5);
  });

  it('sorts by handicap (lowest first)', () => {
    const entries = [makeSeed('a', 18), makeSeed('b', 5), makeSeed('c', 12)];
    const result = generateStrokePlayPairings(entries, 4);
    expect(result.groups[0].entryIds[0]).toBe('b');
    expect(result.groups[0].entryIds[1]).toBe('c');
    expect(result.groups[0].entryIds[2]).toBe('a');
  });

  it('manual seed overrides handicap', () => {
    const entries = [makeSeed('a', 18, 1), makeSeed('b', 5), makeSeed('c', 12)];
    const result = generateStrokePlayPairings(entries, 4);
    expect(result.groups[0].entryIds[0]).toBe('a');
  });

  it('handles 2 players', () => {
    const entries = [makeSeed('a', 10), makeSeed('b', 20)];
    const result = generateStrokePlayPairings(entries);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0].entryIds).toHaveLength(2);
  });
});

describe('Single Elimination Bracket', () => {
  it('creates correct number of matches for power of 2', () => {
    const entries = Array.from({ length: 8 }, (_, i) => makeSeed(`e${i}`, i));
    const matches = generateSingleEliminationBracket(entries);
    expect(matches).toHaveLength(4); // 8/2 = 4 first round matches
  });

  it('assigns byes to top seeds when not power of 2', () => {
    const entries = Array.from({ length: 6 }, (_, i) => makeSeed(`e${i}`, i));
    const matches = generateSingleEliminationBracket(entries);
    expect(matches).toHaveLength(4); // rounds up to 8, so 4 matches
    const byes = matches.filter((m) => m.isBye);
    expect(byes).toHaveLength(2); // 8 - 6 = 2 byes
  });

  it('top seed gets bye', () => {
    const entries = Array.from({ length: 3 }, (_, i) => makeSeed(`e${i}`, i));
    const matches = generateSingleEliminationBracket(entries);
    const byeMatch = matches.find((m) => m.isBye);
    expect(byeMatch).toBeDefined();
    expect(byeMatch!.entry1Id).toBe('e0'); // top seed
    expect(byeMatch!.entry2Id).toBeNull();
  });

  it('all matches have winners bracket side', () => {
    const entries = Array.from({ length: 4 }, (_, i) => makeSeed(`e${i}`, i));
    const matches = generateSingleEliminationBracket(entries);
    expect(matches.every((m) => m.bracketSide === 'winners')).toBe(true);
  });
});

describe('Double Elimination Bracket', () => {
  it('creates winners and losers bracket matches', () => {
    const entries = Array.from({ length: 8 }, (_, i) => makeSeed(`e${i}`, i));
    const matches = generateDoubleEliminationBracket(entries);
    const winners = matches.filter((m) => m.bracketSide === 'winners');
    const losers = matches.filter((m) => m.bracketSide === 'losers');
    expect(winners.length).toBeGreaterThan(0);
    expect(losers.length).toBeGreaterThan(0);
  });

  it('losers bracket matches start empty', () => {
    const entries = Array.from({ length: 4 }, (_, i) => makeSeed(`e${i}`, i));
    const matches = generateDoubleEliminationBracket(entries);
    const losers = matches.filter((m) => m.bracketSide === 'losers');
    expect(losers.every((m) => m.entry1Id === null && m.entry2Id === null)).toBe(true);
  });
});

describe('Round Robin Groups', () => {
  it('distributes players across groups', () => {
    const entries = Array.from({ length: 12 }, (_, i) => makeSeed(`e${i}`, i));
    const result = generateRoundRobinGroups(entries, 3);
    expect(result.groups).toHaveLength(3);
    expect(result.groups[0].entryIds.length).toBe(4);
    expect(result.groups[1].entryIds.length).toBe(4);
    expect(result.groups[2].entryIds.length).toBe(4);
  });

  it('uses snake draft for balanced skill', () => {
    const entries = Array.from({ length: 6 }, (_, i) => makeSeed(`e${i}`, i));
    const result = generateRoundRobinGroups(entries, 3);
    // Snake: e0→g1, e1→g2, e2→g3, e3→g3, e4→g2, e5→g1
    expect(result.groups[0].entryIds).toContain('e0');
    expect(result.groups[0].entryIds).toContain('e5');
  });
});

describe('Reseed from Standings', () => {
  it('reorders by score ascending', () => {
    const entries = [makeSeed('a', 10), makeSeed('b', 20), makeSeed('c', 5)];
    const standings = [
      { entryId: 'a', score: 75 },
      { entryId: 'b', score: 70 },
      { entryId: 'c', score: 80 },
    ];
    const reseeded = reseedFromStandings(entries, standings);
    expect(reseeded[0].entryId).toBe('b');
    expect(reseeded[1].entryId).toBe('a');
    expect(reseeded[2].entryId).toBe('c');
    expect(reseeded[0].manualSeed).toBe(1);
  });
});
