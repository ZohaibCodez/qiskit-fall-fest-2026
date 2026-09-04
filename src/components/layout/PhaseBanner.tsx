'use client';

import Link from 'next/link';
import { useEventPhase } from '@/lib/eventPhase';
import styles from './PhaseBanner.module.css';

/** Surfaces Event-Day / Post-Event modes without adding them to the main nav. */
export function PhaseBanner() {
  const phase = useEventPhase();

  if (phase === 'during') {
    return (
      <div className={styles.banner}>
        <p className={styles.inner}>
          Qiskit Fall Fest 2026 is happening now — <Link href="/event-day">view live schedule & announcements</Link>
        </p>
      </div>
    );
  }

  if (phase === 'after') {
    return (
      <div className={styles.banner}>
        <p className={styles.inner}>
          Thanks for an amazing Qiskit Fall Fest 2026 — <Link href="/gallery">relive the highlights</Link>
        </p>
      </div>
    );
  }

  return null;
}
