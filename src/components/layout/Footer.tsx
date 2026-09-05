import Link from 'next/link';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { siteConfig } from '@/lib/content';
import { ArrowRightIcon } from '@/components/shared/Icons';
import { SOCIAL_ICONS } from '@/components/shared/socialIcons';
import styles from './Footer.module.css';

const QUICK_LINKS: Array<[string, string]> = [
  ['/schedule', 'Schedule'],
  ['/speakers', 'Speakers'],
  ['/activities', 'Activities'],
  ['/resources', 'Resources'],
  ['/registration', 'Registration'],
];

const EVENT_LINKS: Array<[string, string]> = [
  ['/before-you-attend', 'Before You Attend'],
  ['/faq', 'FAQ'],
  ['/gallery', 'Gallery'],
  ['/contact', 'Contact Us'],
];

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
        <div className={styles.columns}>
          <div>
            <Link href="/" className={styles.brand}>
              <BrandMark />
              <span className={styles.brandText}>
                Qiskit
                <span className={styles.brandSub}>{event.name.replace(/^Qiskit\s+/, '')}</span>
              </span>
            </Link>
            <p className={styles.tagline}>
              {event.theme}. Stay connected with the Qiskit community.
            </p>
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

          <nav aria-labelledby="footer-quick">
            <p className={styles.colTitle} id="footer-quick">
              Quick Links
            </p>
            <div className={styles.colLinks}>
              {QUICK_LINKS.map(([href, label]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-labelledby="footer-event">
            <p className={styles.colTitle} id="footer-event">
              Event
            </p>
            <div className={styles.colLinks}>
              {EVENT_LINKS.map(([href, label]) => (
                <Link href={href} key={href}>
                  {label}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <p className={styles.colTitle}>Stay Updated</p>
            <p className={styles.communityText}>
              {contact.communityUrl
                ? 'Join our community channel to get the latest updates about the event.'
                : 'Our official community channel will be announced soon — check back for updates.'}
            </p>
            {contact.communityUrl ? (
              <ExternalLink href={contact.communityUrl} className={styles.communityButton}>
                Join Community
                <ArrowRightIcon size={16} />
              </ExternalLink>
            ) : (
              <Link href="/contact" className={styles.communityButton}>
                Contact Organizers
                <ArrowRightIcon size={16} />
              </Link>
            )}
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottom}>
          <p>
            &copy; {new Date().getFullYear()} {event.chapterName}. All rights reserved.
          </p>
          <p>Built by the {event.chapterName.replace(/\s*—.*$/, '')} team</p>
        </div>
      </div>
    </footer>
  );
}
