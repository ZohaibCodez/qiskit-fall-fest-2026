import { siteConfig } from '@/lib/content';
import styles from './RegisterButton.module.css';

/**
 * The only component that reads `siteConfig.registration`. Every "Register
 * Now" CTA across the site renders through this, so the URL and status
 * enum (coming-soon | open | closed) have exactly one source of truth.
 */
export function RegisterButton({ className }: { className?: string }) {
  const { status, url } = siteConfig.registration;

  if (status === 'open' && url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.button} ${styles.open} ${className ?? ''}`}
      >
        Register Now
      </a>
    );
  }

  const label = status === 'closed' ? 'Registration Closed' : 'Coming Soon';
  const title =
    status === 'closed'
      ? 'Registration for this event has closed.'
      : 'Registration is not open yet — check back soon.';

  return (
    <span
      className={`${styles.button} ${styles.disabled} ${className ?? ''}`}
      aria-disabled="true"
      title={title}
    >
      {label}
    </span>
  );
}
