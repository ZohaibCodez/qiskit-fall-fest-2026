import type { Metadata } from 'next';
import { activities } from '@/lib/content';
import { ActivityCard } from '@/components/activities/ActivityCard';

export const metadata: Metadata = { title: 'Activities — Qiskit Fall Fest 2026' };

export default function ActivitiesPage() {
  return (
    <div className="container page-wrap">
      <h1>Activities &amp; Event Experience</h1>
      <p>What you can expect at Qiskit Fall Fest 2026 — from talks to hands-on workshops to networking.</p>
      <div className="card-grid">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
