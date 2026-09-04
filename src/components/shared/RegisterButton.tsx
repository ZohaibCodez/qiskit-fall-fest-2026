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
export function RegisterButton({
  className,
  onDark,
  compact,
}: {
  className?: string;
  onDark?: boolean;
  compact?: boolean;
}) {
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

  // Compact (nav) keeps the bar from being swallowed by a long label, while
  // still never implying registration is open when it isn't.
  const label = status === 'closed'
    ? (compact ? 'Closed' : 'Registration Closed')
    : (compact ? 'Coming Soon' : 'Registration Opens Soon');
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
