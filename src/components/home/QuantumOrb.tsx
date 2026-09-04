import styles from './QuantumOrb.module.css';

/**
 * Decorative hero visual — pure SVG/CSS so there's no image asset to license
 * or ship. Replace wholesale with the official IBM/Qiskit hero graphic once
 * brand assets are available; nothing else in the hero depends on it.
 */
export function QuantumOrb() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.glow} />
      <svg className={styles.svg} viewBox="0 0 200 200" fill="none">
        <defs>
          <linearGradient id="orbit-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <circle cx="100" cy="100" r="58" stroke="url(#orbit-stroke)" strokeWidth="0.6" strokeDasharray="2 5" opacity="0.6" />

        <g className={styles.orbit}>
          <ellipse cx="100" cy="100" rx="78" ry="30" stroke="url(#orbit-stroke)" strokeWidth="1" />
          <circle className={styles.node} cx="178" cy="100" r="3" fill="#a5b4fc" />
        </g>
        <g className={`${styles.orbit} ${styles.orbit2}`} transform="rotate(60 100 100)">
          <ellipse cx="100" cy="100" rx="78" ry="30" stroke="url(#orbit-stroke)" strokeWidth="1" />
          <circle className={`${styles.node} ${styles.node2}`} cx="22" cy="100" r="3" fill="#7dd3fc" />
        </g>
        <g className={`${styles.orbit} ${styles.orbit3}`} transform="rotate(120 100 100)">
          <ellipse cx="100" cy="100" rx="78" ry="30" stroke="url(#orbit-stroke)" strokeWidth="1" />
          <circle className={`${styles.node} ${styles.node3}`} cx="178" cy="100" r="3" fill="#c4b5fd" />
        </g>

        <circle cx="100" cy="100" r="9" fill="#c7d2fe" opacity="0.28" />
        <circle cx="100" cy="100" r="4.5" fill="#e0e7ff" />
      </svg>
    </div>
  );
}
