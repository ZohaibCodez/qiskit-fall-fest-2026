import type { ReactNode } from 'react';
import { RegisterButton } from './RegisterButton';
import styles from './CtaBand.module.css';

/** Dark closing CTA used at the bottom of Home, About and other pages. */
export function CtaBand({ title, subtitle, art }: { title: string; subtitle: string; art?: ReactNode }) {
  return (
    <div className={styles.band}>
      {art && (
        <span className={styles.art} aria-hidden="true">
          {art}
        </span>
      )}
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <RegisterButton onDark />
    </div>
  );
}
