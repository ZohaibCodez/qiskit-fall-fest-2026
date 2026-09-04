import styles from './StatusBadge.module.css';

export type StatusBadgeTone = 'tba' | 'notPlanned' | 'open' | 'closed' | 'info';

const LABELS: Record<StatusBadgeTone, string> = {
  tba: 'TBA',
  notPlanned: 'Not planned',
  open: 'Open',
  closed: 'Closed',
  info: 'Info',
};

export function StatusBadge({ tone, label }: { tone: StatusBadgeTone; label?: string }) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{label ?? LABELS[tone]}</span>;
}
