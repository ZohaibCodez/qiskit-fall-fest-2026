import { faq } from '@/lib/content';
import { FaqAccordion } from '@/components/faq/FaqAccordion';
import { StructuredData } from '@/components/shared/StructuredData';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'FAQ',
  'Answers to common questions about Qiskit Fall Fest 2026 — eligibility, cost, prerequisites, and more.',
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
    <div className="container page-wrap" style={{ maxWidth: 720 }}>
      <h1>Frequently Asked Questions</h1>
      <FaqAccordion entries={faq} />
      {faq.length > 0 && <StructuredData data={faqSchema} />}
    </div>
  );
}
