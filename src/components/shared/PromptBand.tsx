import Link from 'next/link';
import type { ReactNode } from 'react';
import { IconTile, type TileTone } from './IconTile';
import { ArrowRightIcon } from './Icons';
import styles from './PromptBand.module.css';

/** Light invitation band, e.g. "Want to be a speaker?" → Contact Us. */
export function PromptBand({
  icon,
  tone = 'violet',
  title,
  text,
  actionLabel,
  actionHref,
}: {
  icon: ReactNode;
  tone?: TileTone;
  title: string;
  text: string;
  actionLabel: string;
  actionHref: string;
}) {
  return (
    <div className={styles.band}>
      <IconTile tone={tone} size="lg" shape="circle">
        {icon}
      </IconTile>
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.text}>{text}</p>
      </div>
      <Link href={actionHref} className={styles.action}>
        {actionLabel}
        <ArrowRightIcon size={16} />
      </Link>
    </div>
  );
}
