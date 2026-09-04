import type { ReactNode } from 'react';
import type { Activity, ActivityType } from '@/lib/types';
import { IconTile, type TileTone } from '@/components/shared/IconTile';
import { StatusBadge } from '@/components/shared/StatusBadge';
import {
  MicIcon,
  CodeIcon,
  FlaskIcon,
  TrophyIcon,
  ChatIcon,
  UsersIcon,
  PresentationIcon,
  SparklesIcon,
} from '@/components/shared/Icons';
import styles from './ActivityTile.module.css';

const TYPE_VISUALS: Record<ActivityType, { node: ReactNode; tone: TileTone }> = {
  keynote: { node: <PresentationIcon size={26} />, tone: 'blue' },
  talk: { node: <MicIcon size={26} />, tone: 'blue' },
  workshop: { node: <FlaskIcon size={26} />, tone: 'violet' },
  challenge: { node: <TrophyIcon size={26} />, tone: 'green' },
  panel: { node: <ChatIcon size={26} />, tone: 'pink' },
  networking: { node: <UsersIcon size={26} />, tone: 'amber' },
  demo: { node: <CodeIcon size={26} />, tone: 'cyan' },
  other: { node: <SparklesIcon size={26} />, tone: 'violet' },
};

export function ActivityTile({ activity }: { activity: Activity }) {
  const visual = TYPE_VISUALS[activity.type] ?? TYPE_VISUALS.other;
  const isNotPlanned = activity.status === 'not-planned';

  return (
    <article className={`${styles.tile} ${isNotPlanned ? styles.muted : ''}`}>
      <span className={styles.iconWrap}>
        <IconTile tone={visual.tone} size="lg" shape="circle">
          {visual.node}
        </IconTile>
      </span>
      <p className={styles.title}>{activity.title}</p>
      <p className={styles.description}>{activity.description}</p>
      {isNotPlanned && <StatusBadge tone="notPlanned" />}
      {activity.status === 'tba' && <StatusBadge tone="tba" />}
    </article>
  );
}
