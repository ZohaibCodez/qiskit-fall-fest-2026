import { schedule, siteConfig, announcements, resources } from '@/lib/content';
import { EventDayLive } from '@/components/schedule/EventDayLive';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Event Day',
  'Live schedule, room info, and announcements for Qiskit Fall Fest 2026.',
  '/event-day',
);

export default function EventDayPage() {
  const { event, contact } = siteConfig;
  const workshopLinks = resources.filter((r) => r.category === 'workshop-materials' || r.category === 'challenge');

  return (
    <div className="container page-wrap" style={{ maxWidth: 800 }}>
      <h1>Event Day</h1>

      <EventDayLive schedule={schedule} />

      <h2 style={{ marginTop: 32 }}>Venue</h2>
      <p>
        {event.venue.name}
        {event.venue.address !== 'TBA' && ` — ${event.venue.address}`}
      </p>

      <h2>Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        <ul>
          {announcements.map((a) => (
            <li key={a.id}>{a.message}</li>
          ))}
        </ul>
      )}

      {workshopLinks.length > 0 && (
        <>
          <h2>Workshop &amp; Challenge Links</h2>
          <ul>
            {workshopLinks.map((r) =>
              r.url ? (
                <li key={r.id}>
                  <ExternalLink href={r.url}>{r.title}</ExternalLink>
                </li>
              ) : (
                <li key={r.id}>{r.title} (coming soon)</li>
              ),
            )}
          </ul>
        </>
      )}

      <h2>Need Help?</h2>
      <p>{contact.email === 'TBA' ? 'Contact details TBA.' : <a href={`mailto:${contact.email}`}>{contact.email}</a>}</p>
    </div>
  );
}
