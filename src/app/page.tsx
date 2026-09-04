import Link from 'next/link';
import { siteConfig, schedule, speakers, activities } from '@/lib/content';
import { RegisterButton } from '@/components/shared/RegisterButton';
import { Countdown } from '@/components/shared/Countdown';
import { SessionCard } from '@/components/schedule/SessionCard';
import { SpeakerCard } from '@/components/speakers/SpeakerCard';
import { ActivityCard } from '@/components/activities/ActivityCard';
import { HomeArchiveTeaser } from '@/components/home/HomeArchiveTeaser';
import { QuantumOrb } from '@/components/home/QuantumOrb';
import { StructuredData } from '@/components/shared/StructuredData';
import { EmptyState } from '@/components/shared/EmptyState';
import { CalendarIcon, MapPinIcon, MonitorIcon, ArrowRightIcon } from '@/components/shared/Icons';
import { formatSessionDateTime } from '@/lib/format';
import styles from './page.module.css';

const FORMAT_LABELS: Record<string, string> = {
  'in-person': 'In-Person',
  virtual: 'Virtual',
  hybrid: 'Hybrid',
  tba: 'TBA',
};

/** Splits a trailing year off the event name so it can be styled separately. */
function splitTrailingYear(name: string): [string, string | null] {
  const match = /^(.*?)\s+(\d{4})$/.exec(name);
  return match ? [match[1], match[2]] : [name, null];
}

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

  const [namePart, yearPart] = splitTrailingYear(event.name);

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
        <div className={styles.heroBackdrop} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={`container ${styles.heroInner}`}>
          <div>
            <p className={`${styles.eyebrow} rise-in`}>{event.theme}</p>

            <h1 className={`${styles.title} rise-in`} style={{ '--delay': '80ms' } as React.CSSProperties}>
              {namePart}
              {yearPart && <span className={styles.titleYear}>{yearPart}</span>}
            </h1>

            <p className={`${styles.lede} rise-in`} style={{ '--delay': '160ms' } as React.CSSProperties}>
              {event.description}
            </p>

            <ul className={`${styles.factRow} rise-in`} style={{ '--delay': '240ms' } as React.CSSProperties}>
              <li className={styles.fact}>
                <CalendarIcon className={styles.factIcon} />
                <span className={styles.factText}>
                  <span className={styles.factLabel}>Date</span>
                  <span className={styles.factValue}>
                    {event.datesConfirmed && event.startDate ? formatSessionDateTime(event.startDate) : 'TBA'}
                  </span>
                </span>
              </li>
              <li className={styles.fact}>
                <MapPinIcon className={styles.factIcon} />
                <span className={styles.factText}>
                  <span className={styles.factLabel}>Location</span>
                  <span className={styles.factValue}>{event.venue.name}</span>
                </span>
              </li>
              <li className={styles.fact}>
                <MonitorIcon className={styles.factIcon} />
                <span className={styles.factText}>
                  <span className={styles.factLabel}>Format</span>
                  <span className={styles.factValue}>{FORMAT_LABELS[event.format]}</span>
                </span>
              </li>
            </ul>

            <div className={`${styles.actions} rise-in`} style={{ '--delay': '320ms' } as React.CSSProperties}>
              <RegisterButton onDark />
              <Link href="/schedule" className={styles.ghostButton}>
                Explore Schedule
                <ArrowRightIcon className={styles.ghostArrow} />
              </Link>
            </div>
          </div>

          <div className={`${styles.heroAside} rise-in`} style={{ '--delay': '400ms' } as React.CSSProperties}>
            <div className={styles.orbHolder}>
              <QuantumOrb />
            </div>
            <Countdown startDate={event.startDate} datesConfirmed={event.datesConfirmed} />
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
              Full schedule
              <ArrowRightIcon size={16} />
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
              All speakers
              <ArrowRightIcon size={16} />
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
