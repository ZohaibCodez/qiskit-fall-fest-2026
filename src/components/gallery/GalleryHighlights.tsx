'use client';

import { useEventPhase } from '@/lib/eventPhase';
import { testimonials } from '@/lib/content';
import { ArchiveStats } from '@/components/archive/ArchiveStats';
import { TestimonialCard, TestimonialsEmptyState } from '@/components/archive/TestimonialCard';

/** Appended to the Gallery page only once the event is over — see PROJECT_PLAN.md § Event-Phase Mechanism. */
export function GalleryHighlights() {
  const phase = useEventPhase();
  if (phase !== 'after') return null;

  return (
    <section style={{ marginTop: 48 }}>
      <h2>Event Highlights</h2>
      <ArchiveStats />
      <h3 style={{ marginTop: 32 }}>Testimonials</h3>
      {testimonials.length === 0 ? (
        <TestimonialsEmptyState />
      ) : (
        <div className="card-grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      )}
    </section>
  );
}
