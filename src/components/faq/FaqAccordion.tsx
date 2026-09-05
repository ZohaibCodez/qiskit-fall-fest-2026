'use client';

import { useState } from 'react';
import type { FaqEntry } from '@/lib/types';
import { ChevronDownIcon } from '@/components/shared/Icons';
import styles from './FaqAccordion.module.css';

/**
 * Accessible disclosure list: a real <button> per question carrying
 * aria-expanded/aria-controls, so keyboard (Enter/Space) and screen readers
 * work without any custom key handling. Multiple items may be open at once.
 */
export function FaqAccordion({ entries }: { entries: FaqEntry[] }) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) =>
    setOpenIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    );

  return (
    <div className={styles.list}>
      {entries.map((entry) => {
        const isOpen = openIds.includes(entry.id);
        return (
          <div className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`} key={entry.id}>
            <h3>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${entry.id}`}
                id={`faq-trigger-${entry.id}`}
                onClick={() => toggle(entry.id)}
              >
                {entry.question}
                <ChevronDownIcon size={20} className={styles.icon} />
              </button>
            </h3>

            <div
              id={`faq-panel-${entry.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${entry.id}`}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
              // Hidden from assistive tech and tab order while collapsed.
              {...(isOpen ? {} : { inert: '' as unknown as boolean })}
            >
              <div className={styles.panelInner}>
                <p className={styles.answer}>{entry.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
