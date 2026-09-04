'use client';

import { schedule, siteConfig, announcements, resources } from '@/lib/content';
import { useEventPhase } from '@/lib/eventPhase';
import { NowNextWidget } from '@/components/schedule/NowNextWidget';
import { ExternalLink } from '@/components/shared/ExternalLink';

export default function EventDayPage() {
  const phase = useEventPhase();
  const { event, contact } = siteConfig;
  const workshopLinks = resources.filter((r) => r.category === 'workshop-materials' || r.category === 'challenge');

  return (
    <div className="container page-wrap" style={{ maxWidth: 800 }}>
      <h1>Event Day</h1>

      {phase !== 'during' ? (
        <p>Event-day information isn&apos;t live yet — check back once Qiskit Fall Fest 2026 begins.</p>
      ) : (
        <NowNextWidget schedule={schedule} />
      )}

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
