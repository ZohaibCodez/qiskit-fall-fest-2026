import Link from 'next/link';
import { siteConfig, schedule, speakers, activities } from '@/lib/content';
import { RegisterButton } from '@/components/shared/RegisterButton';
import { Countdown } from '@/components/shared/Countdown';
import { SessionCard } from '@/components/schedule/SessionCard';
import { SpeakerCard } from '@/components/speakers/SpeakerCard';
import { ActivityCard } from '@/components/activities/ActivityCard';
import { HomeArchiveTeaser } from '@/components/home/HomeArchiveTeaser';
import { StructuredData } from '@/components/shared/StructuredData';
import { EmptyState } from '@/components/shared/EmptyState';
import styles from './page.module.css';

const FORMAT_LABELS: Record<string, string> = {
  'in-person': 'In-Person',
  virtual: 'Virtual',
  hybrid: 'Hybrid',
  tba: 'Format TBA',
};

/**
 * Only emitted once there's something true to say — an Event schema built
 * from TBA fields would be misleading structured data, not just an empty page.
 */
function buildEventSchema(event: typeof siteConfig.event, chapterName: string) {
  const hasVenue = event.venue.name !== 'TBA';
  const hasOnlineVenue = event.format === 'virtual' && Boolean(event.venue.onlineUrl);
  if (!event.datesConfirmed || !event.startDate || !event.endDate || !(hasVenue || hasOnlineVenue)) {
    return null;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode:
      event.format === 'virtual'
        ? 'https://schema.org/OnlineEventAttendanceMode'
        : event.format === 'hybrid'
          ? 'https://schema.org/MixedEventAttendanceMode'
          : 'https://schema.org/OfflineEventAttendanceMode',
    location: hasOnlineVenue
      ? { '@type': 'VirtualLocation', url: event.venue.onlineUrl }
      : { '@type': 'Place', name: event.venue.name, address: event.venue.address },
    organizer: { '@type': 'Organization', name: chapterName },
  };
}

export default function Home() {
  const { event } = siteConfig;
  const featuredSessions = schedule.slice(0, 3);
  const featuredSpeakers = speakers.slice(0, 3);
  const featuredActivities = activities.filter((a) => a.status === 'planned').slice(0, 4);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: event.chapterName,
    url: siteConfig.seo.siteUrl ?? undefined,
  };
  const eventSchema = buildEventSchema(event, event.chapterName);

  return (
    <>
      <StructuredData data={organizationSchema} />
      {eventSchema && <StructuredData data={eventSchema} />}

      <section className={styles.hero}>
        <div className="container">
          <p className={styles.eyebrow}>{event.theme}</p>
          <h1 className={styles.title}>{event.name}</h1>
          <p className={styles.lede}>{event.description}</p>

          <div className={styles.metaRow}>
            <span>{FORMAT_LABELS[event.format]}</span>
            <span>·</span>
            <span>{event.venue.name}</span>
            <span>·</span>
            <span>Registration: {siteConfig.registration.status === 'open' ? 'Open' : siteConfig.registration.status === 'closed' ? 'Closed' : 'Coming Soon'}</span>
          </div>

          <div className={styles.countdownWrap}>
            <Countdown startDate={event.startDate} datesConfirmed={event.datesConfirmed} />
          </div>

          <div className={styles.actions}>
            <RegisterButton />
            <Link href="/schedule" className={styles.secondaryLink}>
              View Schedule
            </Link>
            <Link href="/resources" className={styles.secondaryLink}>
              Explore Resources
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>What to Expect</h2>
          </div>
          {featuredActivities.length === 0 ? (
            <EmptyState message="Activities will be announced soon." />
          ) : (
            <div className={styles.grid}>
              {featuredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>Featured Sessions</h2>
            <Link href="/schedule" className={styles.secondaryLink}>
              Full schedule →
            </Link>
          </div>
          {featuredSessions.length === 0 ? (
            <EmptyState message="The schedule will be announced soon." />
          ) : (
            <div className={styles.grid}>
              {featuredSessions.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>Featured Speakers</h2>
            <Link href="/speakers" className={styles.secondaryLink}>
              All speakers →
            </Link>
          </div>
          {featuredSpeakers.length === 0 ? (
            <EmptyState message="Speakers will be announced soon." />
          ) : (
            <div className={styles.grid}>
              {featuredSpeakers.map((speaker) => (
                <SpeakerCard key={speaker.id} speaker={speaker} />
              ))}
            </div>
          )}
        </div>
      </section>

      <HomeArchiveTeaser />

      <section className={styles.ctaSection}>
        <div className="container">
          <h2>Ready to join us?</h2>
          <p>Registration is {siteConfig.registration.cost.toLowerCase()} — secure your spot today.</p>
          <RegisterButton />
        </div>
      </section>
    </>
  );
}
