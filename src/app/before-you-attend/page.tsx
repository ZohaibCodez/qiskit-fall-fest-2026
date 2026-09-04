import Link from 'next/link';
import { siteConfig } from '@/lib/content';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Before You Attend',
  'What to prepare before Qiskit Fall Fest 2026 — required software, laptop setup, and event-day tips.',
  '/before-you-attend',
);

export default function BeforeYouAttendPage() {
  const { contact } = siteConfig;

  return (
    <div className="container page-wrap" style={{ maxWidth: 720 }}>
      <h1>Before You Attend</h1>

      <h2>Who Should Attend</h2>
      <p>Students, developers, researchers, and anyone curious about quantum computing — beginners are welcome.</p>

      <h2>Prior Knowledge</h2>
      <p>None required for the introductory sessions. Basic Python familiarity helps for the hands-on workshop.</p>

      <h2>Required Software &amp; Accounts</h2>
      <ul>
        <li>A free IBM Quantum account (sign up at quantum.ibm.com)</li>
        <li>Python 3.9+ and Qiskit installed, or a browser for the cloud-based Qiskit Lab</li>
      </ul>

      <h2>Laptop &amp; Internet</h2>
      <p>A laptop with a modern browser and stable internet connection is recommended for the workshop.</p>

      <h2>Recommended Preparation</h2>
      <p>
        Review the <Link href="/resources">beginner resources</Link> before the event — no need to complete
        them, just get familiar with the basics.
      </p>

      <h2>Event-Day Instructions</h2>
      <p>Detailed check-in and event-day instructions will be shared closer to the date.</p>

      <h2>Stay Updated</h2>
      <p>
        {contact.communityUrl ? (
          <>
            Join our official community channel for updates:{' '}
            <ExternalLink href={contact.communityUrl}>{contact.communityUrl}</ExternalLink>
          </>
        ) : (
          'Our official communication channel will be announced soon.'
        )}
      </p>
    </div>
  );
}
