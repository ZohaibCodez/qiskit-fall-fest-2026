import { siteConfig } from '@/lib/content';
import { ArrowRightIcon } from './Icons';
import styles from './RegisterButton.module.css';

/**
 * The only component that reads `siteConfig.registration`. Every "Register
 * Now" CTA across the site renders through this, so the URL and status
 * enum (coming-soon | open | closed) have exactly one source of truth.
 *
 * `onDark` only adjusts the disabled treatment, which would otherwise be
 * invisible against the dark hero.
 */
export function RegisterButton({ className, onDark }: { className?: string; onDark?: boolean }) {
  const { status, url } = siteConfig.registration;
  const classes = [styles.button, onDark ? styles.onDark : '', className ?? ''].filter(Boolean).join(' ');

  if (status === 'open' && url) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={`${classes} ${styles.open}`}>
        Register Now
        <ArrowRightIcon className={styles.arrow} />
      </a>
    );
  }

  const label = status === 'closed' ? 'Registration Closed' : 'Registration Opens Soon';
  const title =
    status === 'closed'
      ? 'Registration for this event has closed.'
      : 'Registration is not open yet — check back soon.';

  return (
    <span className={`${classes} ${styles.disabled}`} aria-disabled="true" title={title}>
      {label}
    </span>
  );
}
