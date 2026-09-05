import type { Session, SiteConfig } from './types';

const CLOCK_RE = /^(\d{2}):(\d{2})$/;

/** "09:30" → "9:30 AM". Returns null when unscheduled so callers can show "TBA". */
export function formatClock(clock: string | null): string | null {
  if (!clock) return null;
  const match = CLOCK_RE.exec(clock);
  if (!match) return clock;
  const hour = parseInt(match[1], 10);
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${match[2]} ${period}`;
}

export function formatTimeRange(session: Session): string {
  const start = formatClock(session.start);
  if (!start) return 'Time TBA';
  const end = formatClock(session.end);
  return end ? `${start} – ${end}` : start;
}

/** Minutes since midnight, for ordering sessions within a day. */
function minutesOfDay(clock: string | null): number | null {
  if (!clock) return null;
  const match = CLOCK_RE.exec(clock);
  if (!match) return null;
  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}

/** Unscheduled sessions sort last, preserving their authored order. */
export function sortSessions(sessions: Session[]): Session[] {
  return sessions.slice().sort((a, b) => {
    if (a.day !== b.day) return a.day - b.day;
    const aMin = minutesOfDay(a.start);
    const bMin = minutesOfDay(b.start);
    if (aMin === null && bMin === null) return 0;
    if (aMin === null) return 1;
    if (bMin === null) return -1;
    return aMin - bMin;
  });
}

/** Day numbers that actually have sessions — the schedule's day tabs come from the data, not a hardcoded count. */
export function getEventDays(sessions: Session[]): number[] {
  return Array.from(new Set(sessions.map((s) => s.day))).sort((a, b) => a - b);
}

/**
 * Absolute instant for a session, or null when it can't be known yet —
 * either the event has no confirmed start date, or the session has no time.
 * Everything time-aware (now/next, "starts in", live highlighting) goes
 * through this, so nothing pretends to know a time that isn't set.
 */
export function resolveSessionInstant(
  session: Session,
  config: SiteConfig,
  which: 'start' | 'end' = 'start',
): Date | null {
  const clock = which === 'start' ? session.start : session.end;
  if (!config.event.datesConfirmed || !config.event.startDate || !clock) return null;

  const match = CLOCK_RE.exec(clock);
  if (!match) return null;

  const base = new Date(config.event.startDate);
  if (Number.isNaN(base.getTime())) return null;

  const instant = new Date(base);
  instant.setDate(instant.getDate() + (session.day - 1));
  instant.setHours(parseInt(match[1], 10), parseInt(match[2], 10), 0, 0);
  return instant;
}

export function getCurrentAndNextSession(sessions: Session[], config: SiteConfig, now: Date) {
  const timed = sortSessions(sessions)
    .map((session) => ({
      session,
      start: resolveSessionInstant(session, config, 'start'),
      end: resolveSessionInstant(session, config, 'end'),
    }))
    .filter((entry): entry is { session: Session; start: Date; end: Date } =>
      entry.start !== null && entry.end !== null,
    );

  return {
    current: timed.find((e) => now >= e.start && now <= e.end)?.session ?? null,
    next: timed.find((e) => e.start > now)?.session ?? null,
  };
}

/** "1h 15m" / "45m" until a session begins, or null if it isn't knowable. */
export function formatTimeUntil(target: Date, now: Date): string | null {
  const diffMinutes = Math.round((target.getTime() - now.getTime()) / 60000);
  if (diffMinutes <= 0) return null;
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
}
