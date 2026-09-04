const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/;

/**
 * Formats an ISO datetime string as authored (e.g. "Nov 14, 2026 · 9:00 AM"),
 * without converting through the runtime's local timezone — a schedule
 * should show the venue's local time, identically on server and client.
 */
export function formatSessionDateTime(iso: string): string {
  const match = ISO_RE.exec(iso);
  if (!match) return iso;
  const [, year, month, day, hour, minute] = match;
  const h = parseInt(hour, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${MONTHS[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year} · ${hour12}:${minute} ${period}`;
}

export function formatSessionTime(iso: string): string {
  const match = ISO_RE.exec(iso);
  if (!match) return iso;
  const [, , , , hour, minute] = match;
  const h = parseInt(hour, 10);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${minute} ${period}`;
}
