import type { TeamMember } from '@/lib/types';
import { PlaceholderAvatar } from '@/components/shared/PlaceholderAvatar';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { ExternalLinkIcon } from '@/components/shared/Icons';
import styles from './TeamMemberCard.module.css';

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const isTba = member.status === 'tba';
  const name = isTba ? 'To be announced' : member.name;

  return (
    <article className={`${styles.card} ${isTba ? styles.cardTba : ''}`}>
      <span className={styles.avatar}>
        <PlaceholderAvatar src={member.photo} alt={isTba ? '' : name} size={84} />
      </span>
      <p className={styles.name}>{name}</p>
      <p className={styles.role}>{member.role}</p>

      {isTba ? (
        <p className={styles.tbaNote}>This role hasn&apos;t been assigned yet.</p>
      ) : (
        member.socialUrl && (
          <ExternalLink href={member.socialUrl} className={styles.link} aria-label={`${name}'s profile`}>
            Profile
            <ExternalLinkIcon size={13} />
          </ExternalLink>
        )
      )}
    </article>
  );
}
