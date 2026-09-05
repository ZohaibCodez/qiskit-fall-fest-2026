'use client';

import { useEffect, useState } from 'react';
import type { Session, SiteConfig } from '@/lib/types';
import { getCurrentAndNextSession } from '@/lib/schedule';
import { SessionCard } from './SessionCard';
import styles from './NowNextWidget.module.css';

/** Live "current / next session" view — used on /event-day. Reads the same schedule data as /schedule. */
export function NowNextWidget({ schedule, config }: { schedule: Session[]; config: SiteConfig }) {
  const [{ current, next }, setState] = useState(() => getCurrentAndNextSession(schedule, config, new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      setState(getCurrentAndNextSession(schedule, config, new Date()));
    }, 30_000);
    return () => clearInterval(id);
  }, [schedule, config]);

  const timesKnown = config.event.datesConfirmed && Boolean(config.event.startDate);

  if (!timesKnown) {
    return <p className={styles.empty}>Session times will appear here once the schedule is confirmed.</p>;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.slot}>
        <span className={styles.slotLabel}>Now</span>
        {current ? <SessionCard session={current} highlighted /> : <p className={styles.empty}>No session in progress.</p>}
      </div>
      <div className={styles.slot}>
        <span className={styles.slotLabel}>Next</span>
        {next ? <SessionCard session={next} /> : <p className={styles.empty}>No upcoming session scheduled.</p>}
      </div>
    </div>
  );
}
