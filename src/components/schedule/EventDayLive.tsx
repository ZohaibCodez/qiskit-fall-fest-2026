'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Session, SiteConfig } from '@/lib/types';
import { useEventPhase } from '@/lib/eventPhase';
import {
  getCurrentAndNextSession,
  formatTimeRange,
  resolveSessionInstant,
  formatTimeUntil,
} from '@/lib/schedule';
import { getSpeakersForSession } from '@/lib/content';
import { ClockIcon, MapPinIcon, UsersIcon, ArrowRightIcon } from '@/components/shared/Icons';
import styles from '@/app/event-day/eventDay.module.css';

function speakerLabel(session: Session) {
  const speakers = getSpeakersForSession(session.id);
  return speakers.length ? speakers.map((s) => (s.status === 'tba' ? 'TBA' : s.name)).join(', ') : 'TBA';
}

function SessionMeta({ session }: { session: Session }) {
  return (
    <ul className={styles.nowMeta}>
      <li className={styles.metaItem}>
        <ClockIcon size={17} />
        <span className={styles.metaTime}>{formatTimeRange(session)}</span>
      </li>
      <li className={styles.metaItem}>
        <MapPinIcon size={17} />
        {session.location.isOnline ? 'Online' : session.location.room || 'TBA'}
      </li>
      <li className={styles.metaItem}>
        <UsersIcon size={17} />
        {speakerLabel(session)}
      </li>
    </ul>
  );
}

/**
 * The live "now / next" core of the event-day screen. Time-dependent, so it
 * only runs client-side — the prerendered HTML has no notion of "now".
 */
export function EventDayLive({ schedule, config }: { schedule: Session[]; config: SiteConfig }) {
  const phase = useEventPhase();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const { current, next } = now
    ? getCurrentAndNextSession(schedule, config, now)
    : { current: null, next: null };

  const isLive = phase === 'during';
  const startsAt = next && now ? resolveSessionInstant(next, config, 'start') : null;
  const startsIn = startsAt && now ? formatTimeUntil(startsAt, now) : null;

  return (
    <>
      <div className={styles.statusBar}>
        <span className={`${styles.liveTag} ${isLive ? '' : styles.offlineTag}`}>
          {isLive && <span className={styles.pulse} />}
          {isLive ? 'Live Event' : 'Not Live Yet'}
        </span>
        <p className={styles.eventName}>{config.event.name}</p>
      </div>

      <section className={styles.now} aria-label="Current session">
        <p className={styles.label}>Now</p>
        {current ? (
          <>
            <h2 className={styles.nowTitle}>{current.title}</h2>
            <SessionMeta session={current} />
          </>
        ) : (
          <p className={styles.empty}>
            {isLive
              ? 'No session is running right now — check the schedule for what’s next.'
              : 'Event-day information goes live when the event begins.'}
          </p>
        )}
      </section>

      <section className={styles.next} aria-label="Next session">
        <p className={styles.label}>Next</p>
        {next ? (
          <>
            <h2 className={styles.nextTitle}>{next.title}</h2>
            <SessionMeta session={next} />
            {startsIn && <p className={styles.startsIn}>Starts in {startsIn}</p>}
          </>
        ) : (
          <p className={styles.empty}>
            {config.event.datesConfirmed
              ? 'No further sessions scheduled.'
              : 'Session times will appear here once the schedule is confirmed.'}
          </p>
        )}

        <Link href="/schedule" className={styles.scheduleLink}>
          View full schedule
          <ArrowRightIcon size={16} />
        </Link>
      </section>
    </>
  );
}
