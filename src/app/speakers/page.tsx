import type { Metadata } from 'next';
import { speakers } from '@/lib/content';
import { SpeakerCard } from '@/components/speakers/SpeakerCard';

export const metadata: Metadata = { title: 'Speakers — Qiskit Fall Fest 2026' };

export default function SpeakersPage() {
  return (
    <div className="container page-wrap">
      <h1>Speakers</h1>
      <p>Meet the speakers for Qiskit Fall Fest 2026. Only confirmed details are published — unconfirmed slots are marked TBA.</p>
      <div className="card-grid">
        {speakers.map((speaker) => (
          <SpeakerCard key={speaker.id} speaker={speaker} />
        ))}
      </div>
    </div>
  );
}
