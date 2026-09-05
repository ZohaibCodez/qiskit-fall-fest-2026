import Link from 'next/link';
import { beforeYouAttend, siteConfig } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { Reveal } from '@/components/shared/Reveal';
import { PromptBand } from '@/components/shared/PromptBand';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { ArrowRightIcon, ExternalLinkIcon, ChatIcon } from '@/components/shared/Icons';
import styles from './bya.module.css';

export const metadata = pageMetadata(
  'Before You Attend',
  'A short preparation checklist for Qiskit Fall Fest 2026 — accounts, software, laptop setup and event-day instructions.',
  '/before-you-attend',
);

export default function BeforeYouAttendPage() {
  const { intro, steps } = beforeYouAttend;
  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Before You Attend"
        title="Come prepared."
        titleAccent="It takes minutes."
        lede="No prior quantum experience is required — but a few small steps will help you get the most out of the day."
      />

      <div className="container page-wrap" style={{ maxWidth: 820 }}>
        <p className={styles.intro}>{intro}</p>

        <ol className={styles.steps}>
          {steps.map((step, index) => {
            const isExternal = step.href?.startsWith('http');
            return (
              <Reveal as="li" key={step.id} delay={Math.min(index, 5) * 70} className={styles.step}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={styles.body}>
                  <h2 className={styles.title}>{step.title}</h2>
                  <p className={styles.description}>{step.description}</p>

                  {step.href && step.linkLabel && (
                    isExternal ? (
                      <ExternalLink href={step.href} className={styles.link}>
                        {step.linkLabel}
                        <ExternalLinkIcon size={15} />
                      </ExternalLink>
                    ) : (
                      <Link href={step.href} className={styles.link}>
                        {step.linkLabel}
                        <ArrowRightIcon size={15} />
                      </Link>
                    )
                  )}
                </div>
              </Reveal>
            );
          })}
        </ol>

        <div className={styles.promptWrap}>
          <PromptBand
            icon={<ChatIcon size={26} />}
            tone="cyan"
            title="Stay updated"
            text={
              contact.communityUrl
                ? 'Join our official community channel for announcements, reminders and event-day updates.'
                : 'Our official communication channel will be announced soon — check the contact page for updates.'
            }
            actionLabel={contact.communityUrl ? 'Join Community' : 'Contact Organizers'}
            actionHref={contact.communityUrl ?? '/contact'}
          />
        </div>
      </div>
    </>
  );
}
