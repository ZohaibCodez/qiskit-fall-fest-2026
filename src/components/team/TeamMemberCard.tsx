import type { TeamMember } from '@/lib/types';
import { PlaceholderAvatar } from '@/components/shared/PlaceholderAvatar';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { StatusBadge } from '@/components/shared/StatusBadge';
import styles from './TeamMemberCard.module.css';

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const isTba = member.status === 'tba';
  const name = isTba ? 'Team member TBA' : member.name;

  return (
    <article className={styles.card}>
      <PlaceholderAvatar src={member.photo} alt={name} size={80} />
      <p className={styles.name}>{name}</p>
      <p className={styles.role}>{member.role}</p>
      {isTba ? (
        <StatusBadge tone="tba" />
      ) : (
        member.socialUrl && <ExternalLink href={member.socialUrl}>Profile</ExternalLink>
      )}
    </article>
  );
}
