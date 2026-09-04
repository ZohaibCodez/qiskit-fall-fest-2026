'use client';

import { resources } from '@/lib/content';
import { useEventPhase } from '@/lib/eventPhase';
import { ResourceList } from './ResourceList';

/** Recordings and other after-event material — only meaningful once phase is 'after' (client-side, see lib/eventPhase.tsx). */
export function ResourcesAfterEvent() {
  const phase = useEventPhase();
  if (phase !== 'after') return null;

  const afterEventResources = resources.filter((r) => r.visibleFrom === 'after-event');
  if (afterEventResources.length === 0) return null;

  return <ResourceList resources={afterEventResources} />;
}
