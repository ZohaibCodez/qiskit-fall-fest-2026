'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './GlobeVisual.module.css';

// WebGL touches `window` at import time, so it must stay out of the
// prerendered HTML. ssr:false is compatible with `output: 'export'` — the
// chunk (three.js + react-globe.gl) simply loads after hydration.
const GlobeCanvas = dynamic(() => import('./GlobeCanvas'), { ssr: false });

/** Decorative hero globe. Swap freely for an official IBM/Qiskit hero asset — nothing else depends on it. */
export function GlobeVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);

  // react-globe.gl needs explicit pixel dimensions, so track the container.
  // Measure on mount as well — relying only on the observer leaves the globe
  // unrendered if the first callback reports 0.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = (width: number) => {
      if (width > 0) setSize(Math.round(width));
    };

    measure(el.getBoundingClientRect().width);
    const observer = new ResizeObserver(([entry]) => measure(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.wrap} ref={wrapRef} aria-hidden="true">
      <div className={styles.bloom} />
      {size === 0 && <div className={styles.placeholder} />}
      <div className={styles.canvas}>{size > 0 && <GlobeCanvas size={size} />}</div>
    </div>
  );
}
