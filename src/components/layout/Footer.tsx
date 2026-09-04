import Link from 'next/link';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { siteConfig } from '@/lib/content';
import styles from './Footer.module.css';

export function Footer() {
  const { contact, event } = siteConfig;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.row}>
          <p>
            &copy; {new Date().getFullYear()} {event.chapterName}
          </p>
          <nav className={styles.links} aria-label="Footer">
            <Link href="/contact">Contact</Link>
            <Link href="/registration">Register</Link>
            <Link href="/resources">Resources</Link>
            {contact.communityUrl && (
              <ExternalLink href={contact.communityUrl}>Community</ExternalLink>
            )}
            {contact.socials.map((s) => (
              <ExternalLink href={s.url} key={s.platform}>
                {s.platform}
              </ExternalLink>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
