import type { ReactNode } from 'react';
import type { Activity, ActivityType } from '@/lib/types';
import { IconTile, type TileTone } from '@/components/shared/IconTile';
import { ClockIcon, MapPinIcon, UsersIcon } from '@/components/shared/Icons';
import {
  MicIcon,
  CodeIcon,
  FlaskIcon,
  TrophyIcon,
  ChatIcon,
  PresentationIcon,
  SparklesIcon,
} from '@/components/shared/Icons';
import tileStyles from '@/components/shared/IconTile.module.css';
import styles from './ActivityDetailCard.module.css';

const TYPE_VISUALS: Record<ActivityType, { node: ReactNode; tone: TileTone; label: string }> = {
  keynote: { node: <PresentationIcon size={28} />, tone: 'violet', label: 'Talks' },
  talk: { node: <MicIcon size={28} />, tone: 'blue', label: 'Talks' },
  workshop: { node: <FlaskIcon size={28} />, tone: 'violet', label: 'Workshops' },
  challenge: { node: <TrophyIcon size={28} />, tone: 'green', label: 'Challenges' },
  panel: { node: <ChatIcon size={28} />, tone: 'blue', label: 'Panel' },
  networking: { node: <UsersIcon size={28} />, tone: 'amber', label: 'Networking' },
  demo: { node: <CodeIcon size={28} />, tone: 'cyan', label: 'Demos' },
  other: { node: <SparklesIcon size={28} />, tone: 'violet', label: 'Other' },
};

const STATUS_LABELS: Record<Activity['status'], string> = {
  planned: 'Planned',
  tba: 'TBA',
  'not-planned': 'Not Planned',
};

export function ActivityDetailCard({ activity }: { activity: Activity }) {
  const visual = TYPE_VISUALS[activity.type] ?? TYPE_VISUALS.other;
  const isNotPlanned = activity.status === 'not-planned';
  const isTba = activity.status === 'tba';

  // A cancelled activity has no timing to announce; an undecided one has one
  // that simply isn't set yet. They must not read the same.
  const metaValue = (value: string | null) => (isNotPlanned ? 'Not planned' : (value ?? 'TBA'));

  const statusClass = isNotPlanned
    ? styles.statusNotPlanned
    : isTba
      ? styles.statusTba
      : styles.statusPlanned;

  return (
    <article
      className={`${styles.card} ${isTba ? styles.cardTba : ''} ${isNotPlanned ? styles.cardNotPlanned : ''}`}
    >
      <span className={`${styles.statusBadge} ${statusClass}`}>{STATUS_LABELS[activity.status]}</span>

      <span className={styles.iconWrap}>
        <IconTile tone={isNotPlanned ? 'blue' : visual.tone} size="lg" shape="circle">
          {visual.node}
        </IconTile>
      </span>

      <h3 className={styles.title}>{activity.title}</h3>
      <p className={styles.description}>{activity.description}</p>

      <ul className={styles.meta}>
        <li className={styles.metaItem}>
          <ClockIcon size={15} className={styles.metaIcon} />
          {metaValue(activity.timing)}
        </li>
        <li className={styles.metaItem}>
          <MapPinIcon size={15} className={styles.metaIcon} />
          {metaValue(activity.venue)}
        </li>
        <li className={styles.metaItem}>
          <UsersIcon size={15} className={styles.metaIcon} />
          {metaValue(activity.audience)}
        </li>
      </ul>

      <span
        className={`${styles.typePill} ${isNotPlanned ? styles.statusNotPlanned : tileStyles[visual.tone]}`}
      >
        {isNotPlanned ? 'Not Planned' : isTba ? 'TBA' : visual.label}
      </span>
    </article>
  );
}
