import styles from './SectionHeading.module.css';

export function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading} id={id}>
        {children}
      </h2>
      <span className={styles.rule} aria-hidden="true" />
    </div>
  );
}
