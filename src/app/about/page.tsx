import type { ReactNode } from 'react';
import { about } from '@/lib/content';
import type { AboutCardIcon, FeatureIcon } from '@/lib/types';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Reveal } from '@/components/shared/Reveal';
import { CtaBand } from '@/components/shared/CtaBand';
import { IconTile, type TileTone } from '@/components/shared/IconTile';
import { GlobeVisual } from '@/components/home/GlobeVisual';
import { CodeWindow } from '@/components/about/CodeWindow';
import {
  CalendarIcon,
  CheckCircleIcon,
  GearIcon,
  TargetIcon,
  RocketIcon,
  FlowIcon,
  UsersIcon,
  StarIcon,
  GlobeIcon,
} from '@/components/shared/Icons';
import styles from '@/components/about/About.module.css';

export const metadata = pageMetadata(
  'About',
  'What Qiskit Fall Fest is, a beginner-friendly introduction to Qiskit and quantum computing, and the 2026 theme: A Decade of Quantum on the Cloud.',
  '/about',
);

const FEATURE_ICONS: Record<FeatureIcon, ReactNode> = {
  gear: <GearIcon size={26} />,
  target: <TargetIcon size={26} />,
  rocket: <RocketIcon size={26} />,
  flow: <FlowIcon size={26} />,
};

const CARD_ICONS: Record<AboutCardIcon, { node: ReactNode; tone: TileTone }> = {
  users: { node: <UsersIcon size={24} />, tone: 'violet' },
  rocket: { node: <RocketIcon size={24} />, tone: 'blue' },
  star: { node: <StarIcon size={24} />, tone: 'green' },
};

export default function AboutPage() {
  const { hero, whatIsFest, theme, whatIsQiskit, localEvent, cards, cta } = about;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        titleAccent={hero.titleAccent}
        lede={hero.lede}
        visual={<GlobeVisual />}
      />

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <Reveal>
            <SectionHeading>{whatIsFest.heading}</SectionHeading>
            <p className={styles.body}>{whatIsFest.body}</p>
          </Reveal>

          <Reveal delay={120}>
            <div className={styles.themeCard}>
              <IconTile tone="violet" size="md">
                <CalendarIcon size={22} />
              </IconTile>
              <div>
                <p className={styles.themeLabel}>{theme.label}</p>
                <p className={styles.themeTitle}>{theme.title}</p>
                <p className={styles.themeBody}>{theme.body}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <Reveal>
            <SectionHeading>{whatIsQiskit.heading}</SectionHeading>
            <p className={styles.body}>{whatIsQiskit.body}</p>

            <div className={styles.features}>
              {whatIsQiskit.features.map((feature) => (
                <div className={styles.feature} key={feature.id}>
                  <span className={styles.featureIcon}>{FEATURE_ICONS[feature.icon]}</span>
                  <p className={styles.featureTitle}>{feature.title}</p>
                  <p className={styles.featureText}>{feature.description}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <CodeWindow code={whatIsQiskit.codeSample} />
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`container ${styles.split}`}>
          <Reveal>
            <SectionHeading>{localEvent.heading}</SectionHeading>
            <p className={styles.body}>{localEvent.body}</p>
          </Reveal>

          <Reveal delay={120}>
            <ul className={styles.checklist}>
              {localEvent.objectives.map((objective) => (
                <li className={styles.checkItem} key={objective}>
                  <CheckCircleIcon size={20} className={styles.checkIcon} />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.cards}>
            {cards.map((card, index) => {
              const icon = CARD_ICONS[card.icon] ?? CARD_ICONS.star;
              return (
                <Reveal delay={index * 110} key={card.id}>
                  <article className={styles.card}>
                    <IconTile tone={icon.tone} size="md">
                      {icon.node}
                    </IconTile>
                    <div>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      {card.body && <p className={styles.cardBody}>{card.body}</p>}
                      {card.items.length > 0 && (
                        <ul className={styles.cardList}>
                          {card.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <CtaBand title={cta.title} subtitle={cta.subtitle} art={<GlobeIcon size={40} />} />
        </div>
      </section>
    </>
  );
}
