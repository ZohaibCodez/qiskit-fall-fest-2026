import { team } from '@/lib/content';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Organizing Team',
  'Meet the organizing team behind Qiskit Fall Fest 2026.',
  '/team',
);

export default function TeamPage() {
  return (
    <div className="container page-wrap">
      <h1>Organizing Team</h1>
      <p>The people behind Qiskit Fall Fest 2026.</p>
      {team.length === 0 ? (
        <EmptyState message="Organizing team info coming soon." />
      ) : (
        <div className="card-grid">
          {team.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}
