import Link from 'next/link';
import { siteConfig } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { IconTile } from '@/components/shared/IconTile';
import { EmptyState } from '@/components/shared/EmptyState';
import { SOCIAL_ICONS } from '@/components/shared/socialIcons';
import {
  MailIcon,
  UsersIcon,
  ChatIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  MapPinIcon,
} from '@/components/shared/Icons';
import styles from './contact.module.css';

export const metadata = pageMetadata(
  'Contact',
  'Get in touch with the Qiskit Fall Fest 2026 organizing team.',
  '/contact',
);

export default function ContactPage() {
  const { contact, event } = siteConfig;
  const hasEmail = contact.email !== 'TBA' && contact.email.includes('@');

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Questions, ideas or"
        titleAccent="want to help?"
        lede="Reach out to the organizing team — we're happy to hear from students, speakers, volunteers and partners."
      />

      <div className="container page-wrap">
        <div className={styles.grid}>
          <div className={styles.card}>
            <IconTile tone="blue" size="md">
              <MailIcon size={22} />
            </IconTile>
            <p className={styles.label}>Official Email</p>
            <p className={styles.value}>{hasEmail ? contact.email : 'To be announced'}</p>
            <p className={styles.text}>
              The fastest way to reach the organizing team for questions about the event.
            </p>
            {hasEmail ? (
              <a href={`mailto:${contact.email}`} className={styles.action}>
                Send an email
                <ArrowRightIcon size={16} />
              </a>
            ) : (
              <p className={styles.pending}>Email address coming soon</p>
            )}
          </div>

          <div className={styles.card}>
            <IconTile tone="violet" size="md">
              <ChatIcon size={22} />
            </IconTile>
            <p className={styles.label}>Community Channel</p>
            <p className={styles.value}>{contact.communityUrl ? 'Join the conversation' : 'To be announced'}</p>
            <p className={styles.text}>
              Announcements, reminders and event-day updates are shared here first.
            </p>
            {contact.communityUrl ? (
              <ExternalLink href={contact.communityUrl} className={styles.action}>
                Join community
                <ExternalLinkIcon size={15} />
              </ExternalLink>
            ) : (
              <p className={styles.pending}>Channel link coming soon</p>
            )}
          </div>

          <div className={styles.card}>
            <IconTile tone="cyan" size="md">
              <MapPinIcon size={22} />
            </IconTile>
            <p className={styles.label}>Chapter</p>
            <p className={styles.value}>{event.chapterName}</p>
            <p className={styles.text}>
              {event.venue.name === 'TBA'
                ? 'Venue details will be announced closer to the event.'
                : event.venue.address}
            </p>
            <Link href="/about" className={styles.action}>
              About the event
              <ArrowRightIcon size={16} />
            </Link>
          </div>

          <div className={styles.card}>
            <IconTile tone="green" size="md">
              <UsersIcon size={22} />
            </IconTile>
            <p className={styles.label}>Get Involved</p>
            <p className={styles.value}>Speak or volunteer</p>
            <p className={styles.text}>
              Interested in giving a talk, running a workshop, or helping organize? We&apos;d love to hear from you.
            </p>
            <Link href="/team" className={styles.action}>
              Meet the team
              <ArrowRightIcon size={16} />
            </Link>
          </div>
        </div>

        <section className={styles.socialSection}>
          <h2 className={styles.socialTitle}>Follow along</h2>
          {contact.socials.length === 0 ? (
            <EmptyState message="Official social media accounts will be announced soon." />
          ) : (
            <div className={styles.socials}>
              {contact.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform.toLowerCase()];
                return (
                  <ExternalLink href={social.url} key={social.platform} className={styles.social}>
                    {Icon && <Icon size={19} />}
                    {social.platform}
                  </ExternalLink>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
}
