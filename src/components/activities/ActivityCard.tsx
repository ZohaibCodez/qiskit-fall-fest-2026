import type { Activity } from '@/lib/types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import styles from './ActivityCard.module.css';

export function ActivityCard({ activity }: { activity: Activity }) {
  const isNotPlanned = activity.status === 'not-planned';
  const isTba = activity.status === 'tba';

  return (
    <article className={`${styles.card} ${isNotPlanned ? styles.notPlanned : ''}`}>
      <div className={styles.top}>
        <h3 className={styles.title}>{activity.title}</h3>
        {isNotPlanned && <StatusBadge tone="notPlanned" />}
        {isTba && <StatusBadge tone="tba" />}
      </div>
      <p className={styles.description}>{activity.description}</p>
      {activity.status === 'planned' && (
        <p className={styles.timing}>{activity.timing ?? 'Timing TBA'}</p>
      )}
    </article>
  );
}
