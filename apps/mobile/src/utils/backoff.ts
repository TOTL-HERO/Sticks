/**
 * Calculate exponential backoff delay with jitter.
 * Pure function — no side effects.
 */
export function getBackoffDelay(
  attempt: number,
  base: number = 1000,
  max: number = 60000,
  jitter: number = 0.25,
): number {
  const exponential = Math.min(base * Math.pow(2, attempt), max);
  const jitterRange = exponential * jitter;
  return exponential + (Math.random() * 2 - 1) * jitterRange;
}
