import type { Session } from '@/lib/types';
import { getEventDays, sortSessions } from '@/lib/schedule';
import { SessionCard } from './SessionCard';
import styles from './ScheduleList.module.css';

/** Simple day-grouped list. The /schedule page uses the richer ScheduleExplorer. */
export function ScheduleList({ sessions, highlightSessionId }: { sessions: Session[]; highlightSessionId?: string }) {
  const ordered = sortSessions(sessions);
  const days = getEventDays(ordered);

  return (
    <div>
      {days.map((day) => (
        <section className={styles.group} key={day}>
          <h3 className={styles.groupTitle}>Day {day}</h3>
          <div className={styles.list}>
            {ordered
              .filter((session) => session.day === day)
              .map((session) => (
                <SessionCard key={session.id} session={session} highlighted={session.id === highlightSessionId} />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
