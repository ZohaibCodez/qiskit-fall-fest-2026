import { team } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Reveal } from '@/components/shared/Reveal';
import { PromptBand } from '@/components/shared/PromptBand';
import { UsersIcon } from '@/components/shared/Icons';

export const metadata = pageMetadata(
  'Organizing Team',
  'Meet the student organizers behind Qiskit Fall Fest 2026.',
  '/team',
);

export default function TeamPage() {
  const confirmed = team.filter((m) => m.status === 'confirmed').length;

  return (
    <>
      <PageHero
        eyebrow="The People Behind the Event"
        title="Organized by the"
        titleAccent="community."
        lede="Qiskit Fall Fest 2026 is put together by a volunteer team of students and community members."
      />

      <div className="container page-wrap">
        {team.length === 0 ? (
          <EmptyState message="Organizing team details will be announced soon." />
        ) : (
          <>
            {confirmed === 0 && (
              <p style={{ color: 'var(--color-muted-fg)', marginBottom: 'var(--space-6)' }}>
                Roles are set — the people filling them will be announced shortly.
              </p>
            )}
            <div className="card-grid" style={{ marginTop: 0 }}>
              {team.map((member, index) => (
                <Reveal key={member.id} delay={Math.min(index, 5) * 70}>
                  <TeamMemberCard member={member} />
                </Reveal>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: 'var(--space-12)' }}>
          <PromptBand
            icon={<UsersIcon size={26} />}
            title="Want to help organize?"
            text="We're always looking for volunteers to help run sessions, workshops and community activities."
            actionLabel="Get in touch"
            actionHref="/contact"
          />
        </div>
      </div>
    </>
  );
}
