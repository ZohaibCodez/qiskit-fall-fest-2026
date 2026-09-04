import type { Metadata } from 'next';
import { faq } from '@/lib/content';
import { FaqAccordion } from '@/components/faq/FaqAccordion';

export const metadata: Metadata = { title: 'FAQ — Qiskit Fall Fest 2026' };

export default function FaqPage() {
  return (
    <div className="container page-wrap" style={{ maxWidth: 720 }}>
      <h1>Frequently Asked Questions</h1>
      <FaqAccordion entries={faq} />
    </div>
  );
}
