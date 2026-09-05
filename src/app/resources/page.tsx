import { resources } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { ResourceLibrary } from '@/components/resources/ResourceLibrary';
import { ResourcesAfterEvent } from '@/components/resources/ResourcesAfterEvent';

export const metadata = pageMetadata(
  'Resources',
  'A quantum learning hub — beginner resources, Qiskit documentation, IBM Quantum, tutorials and workshop material.',
  '/resources',
);

export default function ResourcesPage() {
  // After-event material (recordings) is surfaced separately once the event
  // is over — see ResourcesAfterEvent, which reads the client-side phase.
  const alwaysVisible = resources.filter((r) => r.visibleFrom === 'always');

  return (
    <>
      <PageHero
        eyebrow="Quantum Learning Hub"
        title="Everything you need to"
        titleAccent="start learning."
        lede="Curated resources for learning quantum computing and Qiskit — before the event, during the workshops, and long after."
      />

      <div className="container page-wrap">
        <ResourceLibrary resources={alwaysVisible} />
        <ResourcesAfterEvent />
      </div>
    </>
  );
}
