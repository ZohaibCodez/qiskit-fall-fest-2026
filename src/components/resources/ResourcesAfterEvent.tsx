'use client';

import { resources } from '@/lib/content';
import { useEventPhase } from '@/lib/eventPhase';
import { ResourceLibrary } from './ResourceLibrary';

/** Recordings and other post-event material — only meaningful once phase is 'after'. */
export function ResourcesAfterEvent() {
  const phase = useEventPhase();
  if (phase !== 'after') return null;

  const afterEventResources = resources.filter((r) => r.visibleFrom === 'after-event');
  if (afterEventResources.length === 0) return null;

  return <ResourceLibrary resources={afterEventResources} />;
}
