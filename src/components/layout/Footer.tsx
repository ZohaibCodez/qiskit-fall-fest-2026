import Link from 'next/link';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { siteConfig } from '@/lib/content';
import { GithubIcon, LinkedinIcon, XIcon, YoutubeIcon } from '@/components/shared/Icons';
import styles from './Footer.module.css';

/** Known platforms get their real mark; anything else falls back to a text link. */
const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  twitter: XIcon,
  youtube: YoutubeIcon,
};

function BrandMark() {
  return (
    <svg className={styles.brandMark} width="34" height="34" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14.2" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <ellipse cx="16" cy="16" rx="14" ry="5.6" stroke="currentColor" strokeWidth="1.4" transform="rotate(-28 16 16)" />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const { contact, event } = siteConfig;

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <Link href="/" className={styles.brand}>
            <BrandMark />
            <span className={styles.brandText}>
              Qiskit
              <span className={styles.brandSub}>{event.name.replace(/^Qiskit\s+/, '')}</span>
            </span>
          </Link>

          <div className={styles.tagline}>
            <p>{event.theme}.</p>
            <p>Stay connected with the Qiskit community.</p>
          </div>

          {contact.socials.length > 0 && (
            <div className={styles.socials}>
              {contact.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform.toLowerCase()];
                return (
                  <ExternalLink
                    href={social.url}
                    key={social.platform}
                    className={styles.social}
                    aria-label={social.platform}
                  >
                    {Icon ? <Icon size={20} /> : social.platform}
                  </ExternalLink>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p style={{ margin: 0 }}>
            &copy; {new Date().getFullYear()} {event.chapterName}
          </p>
          <nav className={styles.links} aria-label="Footer">
            <Link href="/registration">Register</Link>
            <Link href="/schedule">Schedule</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
            {contact.communityUrl && <ExternalLink href={contact.communityUrl}>Community</ExternalLink>}
          </nav>
        </div>
      </div>
    </footer>
  );
}
