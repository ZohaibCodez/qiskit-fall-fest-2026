import type { ReactNode } from 'react';
import type { Highlight, HighlightIcon } from '@/lib/types';
import { IconTile, type TileTone } from '@/components/shared/IconTile';
import {
  UsersIcon,
  CodeIcon,
  ChatIcon,
  CloudIcon,
  GiftIcon,
  TrophyIcon,
  SparklesIcon,
} from '@/components/shared/Icons';
import styles from './HighlightsStrip.module.css';

const ICONS: Record<HighlightIcon, { node: ReactNode; tone: TileTone }> = {
  users: { node: <UsersIcon />, tone: 'blue' },
  code: { node: <CodeIcon />, tone: 'violet' },
  chat: { node: <ChatIcon />, tone: 'cyan' },
  cloud: { node: <CloudIcon />, tone: 'blue' },
  gift: { node: <GiftIcon />, tone: 'amber' },
  trophy: { node: <TrophyIcon />, tone: 'green' },
  sparkles: { node: <SparklesIcon />, tone: 'pink' },
};

export function HighlightsStrip({ highlights }: { highlights: Highlight[] }) {
  if (highlights.length === 0) return null;

  return (
    <div className={styles.strip}>
      {highlights.map((highlight) => {
        const icon = ICONS[highlight.icon] ?? ICONS.sparkles;
        return (
          <div className={styles.item} key={highlight.id}>
            <IconTile tone={icon.tone} size="sm">
              {icon.node}
            </IconTile>
            <div>
              <p className={styles.title}>{highlight.title}</p>
              <p className={styles.description}>{highlight.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
