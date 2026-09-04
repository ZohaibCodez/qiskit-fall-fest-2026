import { siteConfig } from '@/lib/content';
import { RegisterButton } from '@/components/shared/RegisterButton';
import { RocketIcon } from '@/components/shared/Icons';
import styles from './HomeCta.module.css';

export function HomeCta() {
  const cost = siteConfig.registration.cost;

  return (
    <div className={styles.band}>
      <span className={styles.art}>
        <RocketIcon size={72} />
      </span>
      <div className={styles.body}>
        <h2 className={styles.title}>Be Part of the Quantum Future</h2>
        <p className={styles.subtitle}>
          {cost.toLowerCase() === 'free'
            ? `Join us for ${siteConfig.event.name} — free to attend, no experience required.`
            : `Join us for ${siteConfig.event.name}. Registration: ${cost}.`}
        </p>
      </div>
      <RegisterButton onDark />
    </div>
  );
}
