import { activities } from '@/lib/content';
import { ActivityCard } from '@/components/activities/ActivityCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Activities',
  'Talks, hands-on Qiskit workshops, challenges, and networking at Qiskit Fall Fest 2026.',
  '/activities',
);

export default function ActivitiesPage() {
  return (
    <div className="container page-wrap">
      <h1>Activities &amp; Event Experience</h1>
      <p>What you can expect at Qiskit Fall Fest 2026 — from talks to hands-on workshops to networking.</p>
      {activities.length === 0 ? (
        <EmptyState message="Activities will be announced soon." />
      ) : (
        <div className="card-grid">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
