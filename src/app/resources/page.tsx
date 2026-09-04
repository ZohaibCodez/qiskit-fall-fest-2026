import { resources } from '@/lib/content';
import { ResourceList } from '@/components/resources/ResourceList';
import { ResourcesAfterEvent } from '@/components/resources/ResourcesAfterEvent';
import { EmptyState } from '@/components/shared/EmptyState';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Resources',
  'Beginner quantum computing resources, Qiskit documentation, IBM Quantum, tutorials, and workshop material.',
  '/resources',
);

export default function ResourcesPage() {
  const alwaysVisible = resources.filter((r) => r.visibleFrom === 'always');

  return (
    <div className="container page-wrap">
      <h1>Resources &amp; Learning Hub</h1>
      <p>Everything you need to learn quantum computing and Qiskit, before and after the event.</p>
      {alwaysVisible.length === 0 ? (
        <EmptyState message="Resources coming soon." />
      ) : (
        <ResourceList resources={alwaysVisible} />
      )}
      <ResourcesAfterEvent />
    </div>
  );
}
