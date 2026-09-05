'use client';

import type { Session, SiteConfig } from '@/lib/types';
import { useEventPhase } from '@/lib/eventPhase';
import { NowNextWidget } from './NowNextWidget';

/** Only meaningful while the event is actually happening (client-side phase check). */
export function EventDayLive({ schedule, config }: { schedule: Session[]; config: SiteConfig }) {
  const phase = useEventPhase();

  if (phase !== 'during') {
    return <p>Event-day information isn&apos;t live yet — check back once Qiskit Fall Fest 2026 begins.</p>;
  }

  return <NowNextWidget schedule={schedule} config={config} />;
}
