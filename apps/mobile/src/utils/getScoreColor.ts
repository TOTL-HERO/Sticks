/**
 * Returns a color string based on the relationship between strokes and par.
 * Pure function — same inputs always produce the same output.
 *
 * @param strokes - Number of strokes taken (must be >= 1)
 * @param par - Par value for the hole (must be >= 1)
 * @returns Hex color string
 */
export function getScoreColor(strokes: number, par: number): string {
  const diff = strokes - par;
  if (diff <= -2) return '#e9c349'; // eagle or better — gold
  if (diff === -1) return '#84d7af'; // birdie — green
  if (diff === 0) return '#dfe4dd';  // par — neutral
  if (diff === 1) return '#ffb4ab';  // bogey — light red
  return '#ff7961';                   // double bogey+ — darker red
}
