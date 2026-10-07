const MS_PER_DAY = 86_400_000;

// Number of days left before `date`, never below 0.
export function daysUntil(date, now = new Date()) {
  return Math.max(0, Math.ceil((date - now) / MS_PER_DAY));
}
