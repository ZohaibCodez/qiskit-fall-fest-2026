import type { ReactNode } from 'react';
import styles from './PageHero.module.css';

/** Dark masthead for inner pages. `visual` is optional decoration (e.g. the globe). */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  lede,
  visual,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lede?: string;
  visual?: ReactNode;
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div>
          <p className={`${styles.eyebrow} rise-in`}>{eyebrow}</p>
          <h1 className={`${styles.title} rise-in`} style={{ '--delay': '80ms' } as React.CSSProperties}>
            {title}
            {titleAccent && <> <span className={styles.accent}>{titleAccent}</span></>}
          </h1>
          {lede && (
            <p className={`${styles.lede} rise-in`} style={{ '--delay': '160ms' } as React.CSSProperties}>
              {lede}
            </p>
          )}
        </div>

        {visual && (
          <div className={`${styles.visual} rise-in`} style={{ '--delay': '240ms' } as React.CSSProperties}>
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}
