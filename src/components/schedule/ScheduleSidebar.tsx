import Link from 'next/link';
import type { Session, SiteConfig } from '@/lib/types';
import { getSpeakersForSession } from '@/lib/content';
import { formatTimeRange, resolveSessionInstant, formatTimeUntil } from '@/lib/schedule';
import { IconTile } from '@/components/shared/IconTile';
import { ArrowRightIcon, CalendarIcon } from '@/components/shared/Icons';
import { SESSION_VISUALS, FILTERABLE_TYPES } from './sessionVisuals';
import tileStyles from '@/components/shared/IconTile.module.css';
import styles from './ScheduleSidebar.module.css';

function speakerLabel(session: Session) {
  const speakers = getSpeakersForSession(session.id);
  return speakers.length ? speakers.map((s) => (s.status === 'tba' ? 'TBA' : s.name)).join(', ') : 'TBA';
}

function SessionDetails({ session }: { session: Session }) {
  return (
    <>
      <p className={styles.detail}>
        <span className={styles.detailKey}>Speaker:</span> {speakerLabel(session)}
      </p>
      <p className={styles.detail}>
        <span className={styles.detailKey}>Venue:</span>{' '}
        {session.location.isOnline ? 'Online' : session.location.room || 'TBA'}
      </p>
    </>
  );
}

export function LiveNowCard({ session }: { session: Session | null }) {
  return (
    <div className={`${styles.card} ${styles.live}`}>
      <div className={styles.cardHead}>
        <span className={`${styles.dot} ${styles.dotLive}`} />
        <p className={styles.cardTitle}>Live Now</p>
      </div>

      {session ? (
        <>
          <div className={styles.timeRow}>
            <span className={styles.time}>{formatTimeRange(session)}</span>
            <span className={styles.badge}>NOW</span>
          </div>
          <p className={styles.sessionTitle}>{session.title}</p>
          <SessionDetails session={session} />
          <Link href="/event-day" className={styles.link}>
            View Details
            <ArrowRightIcon size={16} />
          </Link>
        </>
      ) : (
        <p className={styles.empty}>No session is running right now.</p>
      )}
    </div>
  );
}

export function UpNextCard({ session, config, now }: { session: Session | null; config: SiteConfig; now: Date }) {
  const visual = session ? SESSION_VISUALS[session.type] ?? SESSION_VISUALS.other : null;
  const startsAt = session ? resolveSessionInstant(session, config, 'start') : null;
  const startsIn = startsAt ? formatTimeUntil(startsAt, now) : null;

  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <span className={`${styles.dot} ${styles.dotNext}`} />
        <p className={styles.cardTitle}>Up Next</p>
      </div>

      {session && visual ? (
        <>
          <div className={styles.timeRow}>
            <span className={styles.time}>{formatTimeRange(session)}</span>
            <span className={`${styles.typePill} ${tileStyles[visual.tone]}`}>{visual.label}</span>
          </div>
          <p className={styles.sessionTitle}>{session.title}</p>
          <SessionDetails session={session} />
          {startsIn && <p className={styles.startsIn}>Starts in {startsIn}</p>}
          <Link href="/event-day" className={styles.link}>
            View Details
            <ArrowRightIcon size={16} />
          </Link>
        </>
      ) : (
        <p className={styles.empty}>Session times will be announced soon.</p>
      )}
    </div>
  );
}

export function SessionTypeLegend() {
  return (
    <div className={styles.card}>
      <div className={styles.cardHead}>
        <p className={styles.cardTitle}>Session Types</p>
      </div>
      <div className={styles.legend}>
        {FILTERABLE_TYPES.map((type) => {
          const visual = SESSION_VISUALS[type];
          return (
            <div className={styles.legendItem} key={type}>
              <IconTile tone={visual.tone} size="sm">
                {visual.node}
              </IconTile>
              <div>
                <p className={styles.legendName}>{visual.label}</p>
                <p className={styles.legendBlurb}>{visual.blurb}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MissingSomethingCard() {
  return (
    <div className={styles.noticeCard}>
      <IconTile tone="blue" size="md">
        <CalendarIcon size={20} />
      </IconTile>
      <div>
        <p className={styles.noticeTitle}>Missing something?</p>
        <p className={styles.noticeBody}>
          Full schedule and session details will be updated as they are confirmed.
        </p>
      </div>
    </div>
  );
}
