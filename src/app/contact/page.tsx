import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/content';
import { ExternalLink } from '@/components/shared/ExternalLink';

export const metadata: Metadata = { title: 'Contact — Qiskit Fall Fest 2026' };

export default function ContactPage() {
  const { contact, event } = siteConfig;

  return (
    <div className="container page-wrap" style={{ maxWidth: 640 }}>
      <h1>Contact &amp; Community</h1>

      <h2>Chapter</h2>
      <p>{event.chapterName}</p>

      <h2>Email</h2>
      <p>{contact.email === 'TBA' ? 'TBA' : <a href={`mailto:${contact.email}`}>{contact.email}</a>}</p>

      <h2>Community Channel</h2>
      <p>
        {contact.communityUrl ? (
          <ExternalLink href={contact.communityUrl}>{contact.communityUrl}</ExternalLink>
        ) : (
          'TBA'
        )}
      </p>

      <h2>Social Media</h2>
      {contact.socials.length === 0 ? (
        <p>TBA</p>
      ) : (
        <ul>
          {contact.socials.map((s) => (
            <li key={s.platform}>
              <ExternalLink href={s.url}>{s.platform}</ExternalLink>
            </li>
          ))}
        </ul>
      )}

      <h2>Quick Links</h2>
      <ul>
        <li>
          <Link href="/registration">Registration</Link>
        </li>
        <li>
          <Link href="/faq">FAQ</Link>
        </li>
      </ul>
    </div>
  );
}
