'use client';

import { useEffect, useState } from 'react';
import styles from './Countdown.module.css';

const UNITS = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return [
    Math.floor(diff / 86_400_000),
    Math.floor((diff / 3_600_000) % 24),
    Math.floor((diff / 60_000) % 60),
    Math.floor((diff / 1000) % 60),
  ];
}

/**
 * Ticks toward `startDate`. When dates aren't confirmed it keeps the same card
 * shape and shows "--" per unit — the layout never shifts when a real date
 * lands, and the countdown is never shown without saying what it counts to.
 */
export function Countdown({ startDate, datesConfirmed }: { startDate: string | null; datesConfirmed: boolean }) {
  const isLive = datesConfirmed && Boolean(startDate);
  const [remaining, setRemaining] = useState<number[] | null>(() =>
    isLive ? getRemaining(new Date(startDate as string)) : null,
  );

  useEffect(() => {
    if (!isLive || !startDate) return;
    const target = new Date(startDate);
    setRemaining(getRemaining(target));
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [isLive, startDate]);

  return (
    <div className={styles.card} role={isLive ? 'timer' : undefined} aria-label={isLive ? 'Countdown to event start' : undefined}>
      <p className={styles.heading}>Event Starts In</p>
      <div className={styles.units}>
        {UNITS.map((label, i) => (
          <div className={styles.unit} key={label}>
            <span className={styles.value}>
              {remaining ? String(remaining[i]).padStart(2, '0') : '--'}
            </span>
            <span className={styles.label}>{label}</span>
          </div>
        ))}
      </div>
      {!isLive && <p className={styles.note}>Event date to be announced</p>}
    </div>
  );
}
