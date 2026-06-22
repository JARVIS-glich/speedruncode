/** All streak logic uses UTC date strings (YYYY-MM-DD). */

export function todayUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Compute the new streak count when a lesson is completed.
 *
 * Rules:
 * - last_active_date === today   → already earned streak today, leave it
 * - last_active_date === yesterday → consecutive day, increment
 * - anything else (null, gap)   → reset to 1
 */
export function computeNewStreak(
  currentStreak: number,
  lastActiveDate: string | null,
  today: string
): number {
  if (lastActiveDate === today) {
    // Already active today — streak unchanged
    return currentStreak;
  }

  const yesterday = addDays(today, -1);
  if (lastActiveDate === yesterday) {
    // Consecutive day — extend streak
    return currentStreak + 1;
  }

  // Gap or first ever — reset
  return 1;
}
