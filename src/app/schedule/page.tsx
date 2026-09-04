import { schedule } from '@/lib/content';
import { ScheduleList } from '@/components/schedule/ScheduleList';
import { EmptyState } from '@/components/shared/EmptyState';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Schedule',
  'The full agenda for Qiskit Fall Fest 2026 — talks, workshops, and activities with times and rooms.',
  '/schedule',
);

export default function SchedulePage() {
  return (
    <div className="container page-wrap">
      <h1>Schedule</h1>
      <p>The full agenda for Qiskit Fall Fest 2026. Times and rooms are finalized closer to the event.</p>
      {schedule.length === 0 ? (
        <EmptyState message="The schedule will be announced soon." />
      ) : (
        <ScheduleList sessions={schedule} />
      )}
    </div>
  );
}
