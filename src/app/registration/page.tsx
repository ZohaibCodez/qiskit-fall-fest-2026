import { siteConfig } from '@/lib/content';
import { RegisterButton } from '@/components/shared/RegisterButton';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Registration',
  'How to register for Qiskit Fall Fest 2026 — eligibility, deadline, cost, and setup requirements.',
  '/registration',
);

export default function RegistrationPage() {
  const { registration, event } = siteConfig;

  return (
    <div className="container page-wrap" style={{ maxWidth: 720 }}>
      <h1>Registration</h1>
      <p>Register for Qiskit Fall Fest 2026 through our official registration form.</p>
      <div style={{ margin: '24px 0' }}>
        <RegisterButton />
      </div>

      <h2>Eligibility</h2>
      <p>Open to students and community members interested in quantum computing — no prior experience required.</p>

      <h2>Deadline</h2>
      <p>{registration.deadline ?? 'To be announced.'}</p>

      <h2>Cost</h2>
      <p>{registration.cost}</p>

      <h2>What You&apos;ll Need</h2>
      <p>
        A laptop is recommended for the hands-on Qiskit workshop. See{' '}
        <a href="/before-you-attend">Before You Attend</a> for full setup instructions.
      </p>

      <h2>Notes</h2>
      <p>{registration.notes}</p>

      {!event.datesConfirmed && (
        <p style={{ color: 'var(--color-muted-fg)' }}>
          Final event dates and venue will be announced on the Home page once confirmed.
        </p>
      )}
    </div>
  );
}
