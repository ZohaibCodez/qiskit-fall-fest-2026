import { siteConfig, registrationContent } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { RegisterButton } from '@/components/shared/RegisterButton';
import { IconTile } from '@/components/shared/IconTile';
import { HIGHLIGHT_ICONS } from '@/components/shared/highlightIcons';
import { CheckCircleIcon } from '@/components/shared/Icons';
import styles from './registration.module.css';

export const metadata = pageMetadata(
  'Registration',
  'How to register for Qiskit Fall Fest 2026 — eligibility, deadline, cost, and what to bring.',
  '/registration',
);

/** One place mapping registration status → the copy shown on this page (§41). */
const STATUS_COPY = {
  'coming-soon': {
    title: 'Registration Opens Soon',
    text: 'Registration is not open yet. Details will be announced here and on our community channel as soon as they are confirmed.',
    dot: 'dotSoon',
  },
  open: {
    title: 'Registration is Open',
    text: 'Spots are available now. Register through the official form to secure your place.',
    dot: 'dotOpen',
  },
  closed: {
    title: 'Registration Closed',
    text: 'Thank you for your interest — registration for this event has now closed. Follow our community channel for future events.',
    dot: 'dotClosed',
  },
} as const;

export default function RegistrationPage() {
  const { registration, event } = siteConfig;
  const status = STATUS_COPY[registration.status];

  return (
    <>
      <PageHero
        eyebrow="Registration"
        title={`Register for ${event.name}`}
        lede="Free to attend, open to all experience levels. Registration is handled through our official form."
      />

      <div className="container page-wrap">
        <div className={styles.layout}>
          <div>
            <div
              className={`${styles.statusCard} ${registration.status === 'open' ? styles.statusOpen : ''}`}
            >
              <div className={styles.statusRow}>
                <span className={`${styles.statusDot} ${styles[status.dot]}`} />
                <h2 className={styles.statusTitle}>{status.title}</h2>
              </div>
              <p className={styles.statusText}>{status.text}</p>

              <RegisterButton />

              <ul className={styles.statusMeta}>
                <li>
                  <span className={styles.metaLabel}>Cost</span>
                  <span className={styles.metaValue}>{registration.cost}</span>
                </li>
                <li>
                  <span className={styles.metaLabel}>Deadline</span>
                  <span className={styles.metaValue}>{registration.deadline ?? 'TBA'}</span>
                </li>
                <li>
                  <span className={styles.metaLabel}>Format</span>
                  <span className={styles.metaValue}>
                    {event.format === 'tba' ? 'TBA' : event.format.replace('-', ' ')}
                  </span>
                </li>
              </ul>
            </div>

            <section className={styles.block}>
              <h2 className={styles.blockTitle}>Who can attend?</h2>
              <ul className={styles.checklist}>
                {registrationContent.eligibility.map((item) => (
                  <li className={styles.checkItem} key={item}>
                    <CheckCircleIcon size={19} className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className={styles.note}>{registrationContent.confirmation}</p>
            </section>
          </div>

          <section className={styles.block} style={{ marginTop: 0 }}>
            <h2 className={styles.blockTitle}>What you&apos;ll need</h2>
            <div className={styles.requirements}>
              {registrationContent.requirements.map((requirement) => {
                const icon = HIGHLIGHT_ICONS[requirement.icon] ?? HIGHLIGHT_ICONS.sparkles;
                return (
                  <div className={styles.requirement} key={requirement.id}>
                    <IconTile tone={icon.tone} size="sm">
                      {icon.node}
                    </IconTile>
                    <div>
                      <p className={styles.requirementTitle}>{requirement.title}</p>
                      <p className={styles.requirementText}>{requirement.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
