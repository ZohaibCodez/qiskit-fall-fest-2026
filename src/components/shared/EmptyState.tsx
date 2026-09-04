import styles from './EmptyState.module.css';

/** Shown when a content list is entirely empty — distinct from a per-item TBA placeholder. */
export function EmptyState({ message }: { message: string }) {
  return <p className={styles.empty}>{message}</p>;
}
