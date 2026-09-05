import { activities, activitiesPage } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { GlobeVisual } from '@/components/home/GlobeVisual';
import { PromptBand } from '@/components/shared/PromptBand';
import { EmptyState } from '@/components/shared/EmptyState';
import { Reveal } from '@/components/shared/Reveal';
import { HIGHLIGHT_ICONS } from '@/components/shared/highlightIcons';
import { CalendarIcon } from '@/components/shared/Icons';
import { ActivityDetailCard } from '@/components/activities/ActivityDetailCard';
import { StatusLegend } from '@/components/activities/StatusLegend';
import styles from './activities.module.css';

export const metadata = pageMetadata(
  'Activities',
  'Talks, hands-on Qiskit workshops, challenges, panels and networking at Qiskit Fall Fest 2026.',
  '/activities',
);

export default function ActivitiesPage() {
  const { hero, intro, prompt } = activitiesPage;
  // Ordered so planned activities lead and cancelled ones trail.
  const order = { planned: 0, tba: 1, 'not-planned': 2 } as const;
  const ordered = activities.slice().sort((a, b) => order[a.status] - order[b.status]);
  const presentStatuses = Array.from(new Set(ordered.map((a) => a.status)));

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title=""
        titleNode={
          <>
            {hero.titleWords.map((word) => (
              <span key={word} className={styles.titleWord}>
                {word}
                <span className={styles.titleDot}>.</span>{' '}
              </span>
            ))}
          </>
        }
        lede={hero.lede}
        visual={<GlobeVisual />}
        features={hero.features.map((feature) => ({
          id: feature.id,
          title: feature.title,
          description: feature.description,
          icon: (HIGHLIGHT_ICONS[feature.icon] ?? HIGHLIGHT_ICONS.sparkles).node,
        }))}
      />

      <div className="container page-wrap">
        <div className={styles.head}>
          <div>
            <h2 className={styles.heading}>{intro.heading}</h2>
            <p className={styles.subheading}>{intro.subheading}</p>
          </div>
          <StatusLegend present={presentStatuses} />
        </div>

        {ordered.length === 0 ? (
          <EmptyState message="Activities will be announced soon." />
        ) : (
          <div className={styles.grid}>
            {ordered.map((activity, index) => (
              <Reveal key={activity.id} delay={Math.min(index, 4) * 80}>
                <ActivityDetailCard activity={activity} />
              </Reveal>
            ))}
          </div>
        )}

        <div className={styles.promptWrap}>
          <PromptBand
            icon={<CalendarIcon size={26} />}
            title={prompt.title}
            text={prompt.text}
            actionLabel={prompt.actionLabel}
            actionHref={prompt.actionHref}
          />
        </div>
      </div>
    </>
  );
}
