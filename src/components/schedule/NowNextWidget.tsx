'use client';

import { useEffect, useState } from 'react';
import type { Session } from '@/lib/types';
import { getCurrentAndNextSession } from '@/lib/eventPhase';
import { SessionCard } from './SessionCard';
import styles from './NowNextWidget.module.css';

/** Live "current / next session" view — used on /event-day. Reads the same schedule data as /schedule. */
export function NowNextWidget({ schedule }: { schedule: Session[] }) {
  const [{ current, next }, setState] = useState(() => getCurrentAndNextSession(schedule, new Date()));

  useEffect(() => {
    const id = setInterval(() => {
      setState(getCurrentAndNextSession(schedule, new Date()));
    }, 30_000);
    return () => clearInterval(id);
  }, [schedule]);

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
