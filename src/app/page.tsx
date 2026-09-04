import Link from 'next/link';
import { siteConfig, schedule, speakers, activities } from '@/lib/content';
import { RegisterButton } from '@/components/shared/RegisterButton';
import { Countdown } from '@/components/shared/Countdown';
import { SessionCard } from '@/components/schedule/SessionCard';
import { SpeakerCard } from '@/components/speakers/SpeakerCard';
import { ActivityCard } from '@/components/activities/ActivityCard';
import { HomeArchiveTeaser } from '@/components/home/HomeArchiveTeaser';
import styles from './page.module.css';

const FORMAT_LABELS: Record<string, string> = {
  'in-person': 'In-Person',
  virtual: 'Virtual',
  hybrid: 'Hybrid',
  tba: 'Format TBA',
};

export default function Home() {
  const { event } = siteConfig;
  const featuredSessions = schedule.slice(0, 3);
  const featuredSpeakers = speakers.slice(0, 3);
  const featuredActivities = activities.filter((a) => a.status === 'planned').slice(0, 4);

  return (
    <>
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
          <div className={styles.grid}>
            {featuredActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
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
          <div className={styles.grid}>
            {featuredSessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
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
          <div className={styles.grid}>
            {featuredSpeakers.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
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
