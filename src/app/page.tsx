import Link from 'next/link';
import { siteConfig, schedule, speakers, activities, highlights } from '@/lib/content';
import { RegisterButton } from '@/components/shared/RegisterButton';
import { Countdown } from '@/components/shared/Countdown';
import { SessionRowList } from '@/components/schedule/SessionRow';
import { SpeakerTile } from '@/components/speakers/SpeakerTile';
import { ActivityTile } from '@/components/activities/ActivityTile';
import { HighlightsStrip } from '@/components/home/HighlightsStrip';
import { HomeCta } from '@/components/home/HomeCta';
import { HomeArchiveTeaser } from '@/components/home/HomeArchiveTeaser';
import { GlobeVisual } from '@/components/home/GlobeVisual';
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
  // Everything except activities explicitly ruled out for this year — a
  // "not-planned" item has no place in a "what to expect" grid.
  const expectActivities = activities.filter((a) => a.status !== 'not-planned').slice(0, 6);

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
              <GlobeVisual />
            </div>
            <div className={styles.countdownHolder}>
              <Countdown startDate={event.startDate} datesConfirmed={event.datesConfirmed} />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <HighlightsStrip highlights={highlights} />
      </div>

      <section className={styles.section}>
        <div className={`container ${styles.twoColumn}`}>
          <div>
            <div className={styles.sectionHead}>
              <h2>Featured Speakers</h2>
              <Link href="/speakers" className={styles.secondaryLink}>
                View all speakers
                <ArrowRightIcon size={16} />
              </Link>
            </div>
            {featuredSpeakers.length === 0 ? (
              <EmptyState message="Speakers will be announced soon." />
            ) : (
              <div className={styles.speakerGrid}>
                {featuredSpeakers.map((speaker) => (
                  <SpeakerTile key={speaker.id} speaker={speaker} />
                ))}
              </div>
            )}
          </div>

          <div>
            <div className={styles.sectionHead}>
              <h2>Featured Sessions</h2>
              <Link href="/schedule" className={styles.secondaryLink}>
                View full schedule
                <ArrowRightIcon size={16} />
              </Link>
            </div>
            {featuredSessions.length === 0 ? (
              <EmptyState message="The schedule will be announced soon." />
            ) : (
              <SessionRowList sessions={featuredSessions} />
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>What to Expect</h2>
            <Link href="/activities" className={styles.secondaryLink}>
              All activities
              <ArrowRightIcon size={16} />
            </Link>
          </div>
          {expectActivities.length === 0 ? (
            <EmptyState message="Activities will be announced soon." />
          ) : (
            <div className={styles.expectGrid}>
              {expectActivities.map((activity) => (
                <ActivityTile key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </div>
      </section>

      <HomeArchiveTeaser />

      <section className={styles.ctaSection}>
        <div className="container">
          <HomeCta />
        </div>
      </section>
    </>
  );
}
