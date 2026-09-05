import type { Session } from '@/lib/types';
import { getSpeakersForSession } from '@/lib/content';
import { formatClock } from '@/lib/schedule';
import { IconTile } from '@/components/shared/IconTile';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { SESSION_VISUALS } from './sessionVisuals';
import tileStyles from '@/components/shared/IconTile.module.css';
import styles from './TimelineSession.module.css';

export function TimelineSession({
  session,
  isLive,
  isLast,
}: {
  session: Session;
  isLive?: boolean;
  isLast?: boolean;
}) {
  const visual = SESSION_VISUALS[session.type] ?? SESSION_VISUALS.other;
  const speakers = getSpeakersForSession(session.id);
  const speakerLabel = speakers.length
    ? speakers.map((s) => (s.status === 'tba' ? 'TBA' : s.name)).join(', ')
    : 'TBA';
  const isPanel = session.type === 'panel';

  return (
    <div className={`${styles.row} ${isLast ? styles.rowLast : ''}`}>
      <div className={styles.time}>
        <span className={styles.timeStart}>{formatClock(session.start) ?? 'TBA'}</span>
        {session.end && <span className={styles.timeEnd}>– {formatClock(session.end)}</span>}
      </div>

      <div className={styles.rail} aria-hidden="true">
        <span className={`${styles.dot} ${isLive ? styles.dotLive : ''}`} />
      </div>

      <article className={`${styles.card} ${isLive ? styles.cardLive : ''}`}>
        <IconTile tone={visual.tone} size="md">
          {visual.node}
        </IconTile>

        <div className={styles.body}>
          <div className={styles.head}>
            <h3 className={styles.title}>{session.title}</h3>
            {isLive ? (
              <span className={styles.nowBadge}>NOW</span>
            ) : (
              session.status === 'tba' && <StatusBadge tone="tba" />
            )}
          </div>

          <p className={styles.meta}>
            <span>
              {isPanel ? 'Panelists' : 'Speaker'}: {speakerLabel}
            </span>
            <span className={styles.metaSep}>•</span>
            <span>
              Venue: {session.location.isOnline ? 'Online' : session.location.room || 'TBA'}
            </span>
          </p>

          {session.description && <p className={styles.description}>{session.description}</p>}

          {/* Reuses the icon-tile tint scale so the pill always matches the icon. */}
          <span className={`${styles.pill} ${tileStyles[visual.tone]}`}>{visual.label}</span>
        </div>
      </article>
    </div>
  );
}
