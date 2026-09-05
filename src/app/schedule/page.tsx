import { schedule, siteConfig } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { GlobeVisual } from '@/components/home/GlobeVisual';
import { ScheduleExplorer } from '@/components/schedule/ScheduleExplorer';
import { CalendarIcon, MapPinIcon, MonitorIcon } from '@/components/shared/Icons';

export const metadata = pageMetadata(
  'Schedule',
  'The full agenda for Qiskit Fall Fest 2026 — talks, workshops, challenges, and networking sessions.',
  '/schedule',
);

const FORMAT_LABELS: Record<string, string> = {
  'in-person': 'In-Person',
  virtual: 'Virtual',
  hybrid: 'Hybrid',
  tba: 'TBA',
};

export default function SchedulePage() {
  const { event } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Event Schedule"
        title="Schedule"
        lede={`Explore the full agenda of ${event.name}. All timings are shown in local time.`}
        visual={<GlobeVisual />}
        facts={[
          {
            icon: <CalendarIcon size={20} />,
            label: 'Date',
            value:
              event.datesConfirmed && event.startDate
                ? new Date(event.startDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'TBA',
          },
          { icon: <MapPinIcon size={20} />, label: 'Location', value: event.venue.name },
          { icon: <MonitorIcon size={20} />, label: 'Format', value: FORMAT_LABELS[event.format] },
        ]}
      />

      <div className="container page-wrap">
        <ScheduleExplorer sessions={schedule} config={siteConfig} />
      </div>
    </>
  );
}
