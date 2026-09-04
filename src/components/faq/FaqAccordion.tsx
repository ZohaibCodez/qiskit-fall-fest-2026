import type { FaqEntry } from '@/lib/types';
import styles from './FaqAccordion.module.css';

/** Native <details>/<summary> — keyboard and screen-reader accessible with no JS. */
export function FaqAccordion({ entries }: { entries: FaqEntry[] }) {
  return (
    <div>
      {entries.map((entry) => (
        <details className={styles.item} key={entry.id}>
          <summary className={styles.question}>
            {entry.question}
            <span className={styles.icon} aria-hidden="true">
              +
            </span>
          </summary>
          <p className={styles.answer}>{entry.answer}</p>
        </details>
      ))}
    </div>
  );
}
