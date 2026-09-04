import type { Session } from '@/lib/types';
import { SessionCard } from './SessionCard';
import styles from './ScheduleList.module.css';

function dayKey(session: Session): string {
  if (!session.startTime) return 'Date TBA';
  return session.startTime.slice(0, 10);
}

function dayLabel(key: string): string {
  if (key === 'Date TBA') return key;
  const [year, month, day] = key.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

/** Shared by /schedule and the Event-Day now/next widget — one rendering of session data. */
export function ScheduleList({ sessions, highlightSessionId }: { sessions: Session[]; highlightSessionId?: string }) {
  const groups = new Map<string, Session[]>();
  for (const session of sessions) {
    const key = dayKey(session);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(session);
  }

  return (
    <div>
      {Array.from(groups.entries()).map(([key, group]) => (
        <section className={styles.group} key={key}>
          <h3 className={styles.groupTitle}>{dayLabel(key)}</h3>
          <div className={styles.list}>
            {group.map((session) => (
              <SessionCard key={session.id} session={session} highlighted={session.id === highlightSessionId} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
