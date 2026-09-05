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
  stats,
  features,
  titleNode,
}: {
  eyebrow: string;
  title: string;
  titleAccent?: string;
  lede?: string;
  visual?: ReactNode;
  /** Inline meta row (date / location / format). */
  facts?: HeroFact[];
  /** Bordered panel variant, for counts like speakers / sessions / countries. */
  stats?: HeroFact[];
  /** Bordered panel with circular icon tiles and a description per item. */
  features?: Array<{ id: string; icon: ReactNode; title: string; description: string }>;
  /** Rendered in place of `title` when the title needs custom markup. */
  titleNode?: ReactNode;
}) {
  return (
    <section className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.grid} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div>
          <p className={`${styles.eyebrow} rise-in`}>{eyebrow}</p>
          <h1 className={`${styles.title} rise-in`} style={{ '--delay': '80ms' } as React.CSSProperties}>
            {titleNode ?? (
              <>
                {title}
                {titleAccent && <> <span className={styles.accent}>{titleAccent}</span></>}
              </>
            )}
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

          {stats && stats.length > 0 && (
            <div className={`${styles.statsPanel} rise-in`} style={{ '--delay': '240ms' } as React.CSSProperties}>
              {stats.map((stat) => (
                <div className={styles.stat} key={stat.label}>
                  <span className={styles.factIcon}>{stat.icon}</span>
                  <span className={styles.factText}>
                    <span className={styles.factLabel}>{stat.label}</span>
                    <span className={styles.factValue}>{stat.value}</span>
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>

        {visual && (
          <div className={`${styles.visual} rise-in`} style={{ '--delay': '240ms' } as React.CSSProperties}>
            {visual}
          </div>
        )}
      </div>

      {/* Full container width, outside the text/visual grid — four items
          squeezed into one grid column wrap into unreadable slivers. */}
      {features && features.length > 0 && (
        <div className="container">
          <div className={`${styles.featurePanel} rise-in`} style={{ '--delay': '300ms' } as React.CSSProperties}>
            {features.map((feature) => (
              <div className={styles.feature} key={feature.id}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <div className={styles.featureBody}>
                  <p className={styles.featureTitle}>{feature.title}</p>
                  <p className={styles.featureText}>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
