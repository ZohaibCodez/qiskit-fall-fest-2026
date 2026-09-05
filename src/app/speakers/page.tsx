import { speakers, schedule } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { GlobeVisual } from '@/components/home/GlobeVisual';
import { PromptBand } from '@/components/shared/PromptBand';
import { SpeakersExplorer } from '@/components/speakers/SpeakersExplorer';
import { UsersIcon, MicIcon, GlobeIcon } from '@/components/shared/Icons';

export const metadata = pageMetadata(
  'Speakers',
  'Meet the researchers, educators, developers and industry leaders speaking at Qiskit Fall Fest 2026.',
  '/speakers',
);

export default function SpeakersPage() {
  const confirmed = speakers.filter((s) => s.status === 'confirmed');

  // Counts render as "TBA" until there's something real to count — a bold
  // "0 Speakers" would read as a broken page, not an honest one.
  const sessionCount = new Set(confirmed.flatMap((s) => s.sessionIds)).size;
  const countryCount = new Set(confirmed.map((s) => s.country).filter(Boolean)).size;
  const stat = (value: number) => (value > 0 ? String(value) : 'TBA');

  return (
    <>
      <PageHero
        eyebrow="Meet the Speakers"
        title="Learn from Quantum Experts & Innovators"
        lede="Our speakers are researchers, educators, developers and industry leaders who are building the future of quantum computing."
        visual={<GlobeVisual />}
        stats={[
          { icon: <UsersIcon size={20} />, label: 'Speakers', value: stat(confirmed.length) },
          { icon: <MicIcon size={20} />, label: 'Sessions', value: stat(sessionCount) },
          { icon: <GlobeIcon size={20} />, label: 'Countries', value: stat(countryCount) },
        ]}
      />

      <div className="container page-wrap">
        <SpeakersExplorer speakers={speakers} sessions={schedule} />

        <div style={{ marginTop: 'var(--space-8)' }}>
          <PromptBand
            icon={<UsersIcon size={28} />}
            title="Want to be a speaker?"
            text="We are always looking for passionate individuals to share their knowledge and inspire the quantum community."
            actionLabel="Contact Us"
            actionHref="/contact"
          />
        </div>
      </div>
    </>
  );
}
