/** Map 0–100 score to a human label for UI and storage. */
export function scoreToLabel(value: number): string {
  if (value >= 85) return "Excellent";
  if (value >= 70) return "Strong";
  if (value >= 55) return "High";
  if (value >= 40) return "Medium";
  if (value >= 25) return "Low";
  return "Very low";
}

export function clampScore(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}
