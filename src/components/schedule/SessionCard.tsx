import type { Session } from '@/lib/types';
import { getSpeakersForSession } from '@/lib/content';
import { formatSessionDateTime } from '@/lib/format';
import { StatusBadge } from '@/components/shared/StatusBadge';
import styles from './SessionCard.module.css';

const TYPE_LABELS: Record<Session['type'], string> = {
  keynote: 'Keynote',
  talk: 'Talk',
  workshop: 'Workshop',
  challenge: 'Challenge',
  panel: 'Panel',
  networking: 'Networking',
  break: 'Break',
  ceremony: 'Ceremony',
  other: 'Session',
};

export function SessionCard({ session, highlighted }: { session: Session; highlighted?: boolean }) {
  const speakers = getSpeakersForSession(session.id);
  const isTba = session.status === 'tba';

  return (
    <article className={`${styles.card} ${highlighted ? styles.highlighted : ''}`}>
      <div className={styles.top}>
        <StatusBadge tone="info" label={TYPE_LABELS[session.type]} />
        {isTba && <StatusBadge tone="tba" />}
      </div>
      <h3 className={styles.title}>{session.title}</h3>
      <p className={styles.meta}>
        {isTba || !session.startTime ? 'Time TBA' : formatSessionDateTime(session.startTime)}
        {' · '}
        {session.location.isOnline
          ? session.location.onlineUrl
            ? 'Online'
            : 'Online (link TBA)'
          : session.location.room || 'Room TBA'}
      </p>
      {session.description && <p className={styles.description}>{session.description}</p>}
      {speakers.length > 0 && (
        <p className={styles.speakers}>
          {speakers.map((s) => s.name).join(', ')}
        </p>
      )}
    </article>
  );
}
