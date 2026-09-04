'use client';

import { resources } from '@/lib/content';
import { useEventPhase } from '@/lib/eventPhase';
import { ResourceList } from '@/components/resources/ResourceList';
import type { ResourceVisibility } from '@/lib/types';

export default function ResourcesPage() {
  const phase = useEventPhase();
  const visibility: ResourceVisibility[] = phase === 'after' ? ['always', 'after-event'] : ['always'];
  const visible = resources.filter((r) => visibility.includes(r.visibleFrom));

  return (
    <div className="container page-wrap">
      <h1>Resources &amp; Learning Hub</h1>
      <p>Everything you need to learn quantum computing and Qiskit, before and after the event.</p>
      <ResourceList resources={visible} />
    </div>
  );
}
