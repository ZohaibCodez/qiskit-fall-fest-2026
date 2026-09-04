import type { ReactNode } from 'react';
import styles from './IconTile.module.css';

export type TileTone = 'blue' | 'violet' | 'green' | 'amber' | 'pink' | 'cyan';

export function IconTile({
  children,
  tone = 'blue',
  size = 'md',
  shape = 'rounded',
}: {
  children: ReactNode;
  tone?: TileTone;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'rounded' | 'circle';
}) {
  return <span className={`${styles.tile} ${styles[shape]} ${styles[size]} ${styles[tone]}`}>{children}</span>;
}
