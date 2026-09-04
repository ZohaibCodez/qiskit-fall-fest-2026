import { speakers } from '@/lib/content';
import { SpeakerCard } from '@/components/speakers/SpeakerCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Speakers',
  'Meet the speakers for Qiskit Fall Fest 2026.',
  '/speakers',
);

export default function SpeakersPage() {
  return (
    <div className="container page-wrap">
      <h1>Speakers</h1>
      <p>Meet the speakers for Qiskit Fall Fest 2026. Only confirmed details are published — unconfirmed slots are marked TBA.</p>
      {speakers.length === 0 ? (
        <EmptyState message="Speakers will be announced soon." />
      ) : (
        <div className="card-grid">
          {speakers.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      )}
    </div>
  );
}
