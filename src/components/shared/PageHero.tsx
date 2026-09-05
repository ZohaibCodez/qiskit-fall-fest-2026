import type { ReactNode } from 'react';
import styles from './PageHero.module.css';

export type HeroFact = { icon: ReactNode; label: string; value: string };

/** Dark masthead for inner pages. `visual` is optional decoration (e.g. the globe). */
export function PageHero({
  eyebrow,
  title,
  titleAccent,
  lede,
  visual,
  facts,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lede?: string;
  visual?: ReactNode;
  facts?: HeroFact[];
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

          {facts && facts.length > 0 && (
            <ul className={`${styles.factRow} rise-in`} style={{ '--delay': '240ms' } as React.CSSProperties}>
              {facts.map((fact) => (
                <li className={styles.fact} key={fact.label}>
                  <span className={styles.factIcon}>{fact.icon}</span>
                  <span className={styles.factText}>
                    <span className={styles.factLabel}>{fact.label}</span>
                    <span className={styles.factValue}>{fact.value}</span>
                  </span>
                </li>
              ))}
            </ul>
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
