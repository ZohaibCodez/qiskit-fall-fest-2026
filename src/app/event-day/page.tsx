import { schedule, siteConfig, announcements, resources } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { EventDayLive } from '@/components/schedule/EventDayLive';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { ExternalLinkIcon } from '@/components/shared/Icons';
import { formatClock } from '@/lib/schedule';
import styles from './eventDay.module.css';

export const metadata = pageMetadata(
  'Event Day',
  'Live schedule, room information and announcements for Qiskit Fall Fest 2026.',
  '/event-day',
);

export default function EventDayPage() {
  const { event, contact } = siteConfig;
  const workshopLinks = resources.filter(
    (r) => r.category === 'workshop-materials' || r.category === 'challenge',
  );
  const hasEmail = contact.email !== 'TBA' && contact.email.includes('@');

  return (
    <div className={styles.screen}>
      <div className="container">
        <EventDayLive schedule={schedule} config={siteConfig} />

        <div className={styles.panels}>
          <section className={styles.panel} aria-label="Announcements">
            <h2 className={styles.panelTitle}>Announcements</h2>
            {announcements.length === 0 ? (
              <p className={styles.empty}>No announcements right now.</p>
            ) : (
              <ul className={styles.list}>
                {announcements.map((announcement) => (
                  <li
                    className={`${styles.announcement} ${
                      announcement.priority === 'urgent' ? styles.urgent : ''
                    }`}
                    key={announcement.id}
                  >
                    <span>
                      <span className={styles.announcementTime}>
                        {formatClock(announcement.timestamp.slice(11, 16)) ?? ''}
                      </span>
                      {announcement.message}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className={styles.panel} aria-label="Venue and help">
            <h2 className={styles.panelTitle}>Venue &amp; Help</h2>
            <ul className={styles.list}>
              <li className={`${styles.linkItem} ${styles.linkPending}`}>
                <span>Venue</span>
                <span>{event.venue.name}</span>
              </li>
              {event.venue.mapUrl ? (
                <li>
                  <ExternalLink href={event.venue.mapUrl} className={styles.linkItem}>
                    Open in maps
                    <ExternalLinkIcon size={16} />
                  </ExternalLink>
                </li>
              ) : null}
              <li>
                {hasEmail ? (
                  <a href={`mailto:${contact.email}`} className={styles.linkItem}>
                    Contact an organizer
                    <ExternalLinkIcon size={16} />
                  </a>
                ) : (
                  <span className={`${styles.linkItem} ${styles.linkPending}`}>
                    <span>Organizer contact</span>
                    <span>TBA</span>
                  </span>
                )}
              </li>
            </ul>
          </section>

          <section className={styles.panel} aria-label="Workshop and challenge links">
            <h2 className={styles.panelTitle}>Workshop &amp; Challenge Links</h2>
            {workshopLinks.length === 0 ? (
              <p className={styles.empty}>Links will be posted here during the event.</p>
            ) : (
              <ul className={styles.list}>
                {workshopLinks.map((resource) =>
                  resource.url ? (
                    <li key={resource.id}>
                      <ExternalLink href={resource.url} className={styles.linkItem}>
                        {resource.title}
                        <ExternalLinkIcon size={16} />
                      </ExternalLink>
                    </li>
                  ) : (
                    <li className={`${styles.linkItem} ${styles.linkPending}`} key={resource.id}>
                      <span>{resource.title}</span>
                      <span>Coming soon</span>
                    </li>
                  ),
                )}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
