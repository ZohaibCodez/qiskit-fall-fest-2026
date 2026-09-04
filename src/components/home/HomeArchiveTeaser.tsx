'use client';

import Link from 'next/link';
import { useEventPhase } from '@/lib/eventPhase';
import styles from '@/app/page.module.css';

/** Only meaningful post-event, so phase must be read client-side (see lib/eventPhase.tsx). */
export function HomeArchiveTeaser() {
  const phase = useEventPhase();
  if (phase !== 'after') return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHead}>
          <h2>Relive Qiskit Fall Fest 2026</h2>
          <Link href="/gallery" className={styles.secondaryLink}>
            View highlights →
          </Link>
        </div>
        <p>Photos, stats, and testimonials from the event are now up on the Gallery page.</p>
      </div>
    </section>
  );
}
