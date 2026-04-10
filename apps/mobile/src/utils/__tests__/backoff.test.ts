import { describe, it, expect } from 'vitest';
import { getBackoffDelay } from '../../utils/backoff';

describe('Sync Queue Backoff', () => {
  it('first attempt is around base delay', () => {
    const delays = Array.from({ length: 100 }, () => getBackoffDelay(0, 1000, 60000, 0));
    expect(delays.every((d) => d === 1000)).toBe(true);
  });

  it('exponentially increases', () => {
    const d0 = getBackoffDelay(0, 1000, 60000, 0);
    const d1 = getBackoffDelay(1, 1000, 60000, 0);
    const d2 = getBackoffDelay(2, 1000, 60000, 0);
    expect(d0).toBe(1000);
    expect(d1).toBe(2000);
    expect(d2).toBe(4000);
  });

  it('caps at max delay', () => {
    const d = getBackoffDelay(20, 1000, 60000, 0);
    expect(d).toBe(60000);
  });

  it('applies jitter within range', () => {
    const delays = Array.from({ length: 100 }, () => getBackoffDelay(0, 1000, 60000, 0.25));
    const min = Math.min(...delays);
    const max = Math.max(...delays);
    expect(min).toBeGreaterThanOrEqual(750);
    expect(max).toBeLessThanOrEqual(1250);
  });
});
