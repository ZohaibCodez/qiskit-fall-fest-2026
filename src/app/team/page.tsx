import type { Metadata } from 'next';
import { team } from '@/lib/content';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';

export const metadata: Metadata = { title: 'Organizing Team — Qiskit Fall Fest 2026' };

export default function TeamPage() {
  return (
    <div className="container page-wrap">
      <h1>Organizing Team</h1>
      <p>The people behind Qiskit Fall Fest 2026.</p>
      <div className="card-grid">
        {team.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
