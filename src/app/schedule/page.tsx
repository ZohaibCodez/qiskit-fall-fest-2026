import type { Metadata } from 'next';
import { schedule } from '@/lib/content';
import { ScheduleList } from '@/components/schedule/ScheduleList';

export const metadata: Metadata = { title: 'Schedule — Qiskit Fall Fest 2026' };

export default function SchedulePage() {
  return (
    <div className="container page-wrap">
      <h1>Schedule</h1>
      <p>The full agenda for Qiskit Fall Fest 2026. Times and rooms are finalized closer to the event.</p>
      <ScheduleList sessions={schedule} />
    </div>
  );
}
