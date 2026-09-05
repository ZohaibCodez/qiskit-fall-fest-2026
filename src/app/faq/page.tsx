import { faq, siteConfig } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { FaqAccordion } from '@/components/faq/FaqAccordion';
import { StructuredData } from '@/components/shared/StructuredData';
import { EmptyState } from '@/components/shared/EmptyState';
import { PromptBand } from '@/components/shared/PromptBand';
import { MailIcon } from '@/components/shared/Icons';

export const metadata = pageMetadata(
  'FAQ',
  'Answers to common questions about Qiskit Fall Fest 2026 — who can attend, cost, prerequisites, and what to bring.',
  '/faq',
);

export default function FaqPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((entry) => ({
      '@type': 'Question',
      name: entry.question,
      acceptedAnswer: { '@type': 'Answer', text: entry.answer },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Questions?"
        titleAccent="Answered."
        lede={`Everything you need to know about attending ${siteConfig.event.name}. Can't find your answer? Get in touch.`}
      />

      <div className="container page-wrap" style={{ maxWidth: 820 }}>
        {faq.length === 0 ? (
          <EmptyState message="Frequently asked questions will be published soon." />
        ) : (
          <>
            <FaqAccordion entries={faq} />
            <StructuredData data={faqSchema} />
          </>
        )}

        <div style={{ marginTop: 'var(--space-8)' }}>
          <PromptBand
            icon={<MailIcon size={26} />}
            tone="blue"
            title="Still have a question?"
            text="If your question isn't answered here, reach out to the organizing team and we'll get back to you."
            actionLabel="Contact Us"
            actionHref="/contact"
          />
        </div>
      </div>
    </>
  );
}
