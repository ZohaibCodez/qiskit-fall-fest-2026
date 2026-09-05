import type { ActivityStatus } from '@/lib/types';
import styles from './StatusLegend.module.css';

const ITEMS: Array<{ status: ActivityStatus; label: string; className: string }> = [
  { status: 'planned', label: 'Planned', className: 'planned' },
  { status: 'tba', label: 'TBA', className: 'tba' },
  { status: 'not-planned', label: 'Not Planned', className: 'notPlanned' },
];

/** Explains the three activity states. Only shows states actually present in the data. */
export function StatusLegend({ present }: { present: ActivityStatus[] }) {
  const visible = ITEMS.filter((item) => present.includes(item.status));
  if (visible.length === 0) return null;

  return (
    <div className={styles.legend}>
      {visible.map((item) => (
        <span className={`${styles.item} ${styles[item.className]}`} key={item.status}>
          <span className={styles.dot} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
