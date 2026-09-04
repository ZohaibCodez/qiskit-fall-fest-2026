'use client';

import { useEffect, useState } from 'react';
import styles from './Countdown.module.css';

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

/** Ticks toward `startDate`. Renders "Date to be announced" when unconfirmed. */
export function Countdown({ startDate, datesConfirmed }: { startDate: string | null; datesConfirmed: boolean }) {
  const [remaining, setRemaining] = useState(() =>
    startDate ? getRemaining(new Date(startDate)) : null,
  );

  useEffect(() => {
    if (!startDate) return;
    const target = new Date(startDate);
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000);
    return () => clearInterval(id);
  }, [startDate]);

  if (!datesConfirmed || !startDate || !remaining) {
    return <p className={styles.tba}>Date to be announced</p>;
  }

  const units: Array<[string, number]> = [
    ['Days', remaining.days],
    ['Hours', remaining.hours],
    ['Min', remaining.minutes],
    ['Sec', remaining.seconds],
  ];

  return (
    <div className={styles.wrap} role="timer" aria-label="Countdown to event start">
      {units.map(([label, value]) => (
        <div className={styles.unit} key={label}>
          <span className={styles.value}>{String(value).padStart(2, '0')}</span>
          <span className={styles.label}>{label}</span>
        </div>
      ))}
    </div>
  );
}
