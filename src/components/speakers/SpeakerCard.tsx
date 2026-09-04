import type { Speaker } from '@/lib/types';
import { getSessionsForSpeaker } from '@/lib/content';
import { formatSessionDateTime } from '@/lib/format';
import { PlaceholderAvatar } from '@/components/shared/PlaceholderAvatar';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { StructuredData } from '@/components/shared/StructuredData';
import styles from './SpeakerCard.module.css';

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const isTba = speaker.status === 'tba';
  const sessions = getSessionsForSpeaker(speaker.id);
  const name = isTba ? 'Speaker TBA' : speaker.name;

  return (
    <article className={styles.card}>
      {!isTba && (
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: speaker.name,
            jobTitle: speaker.designation || undefined,
            worksFor: speaker.organization ? { '@type': 'Organization', name: speaker.organization } : undefined,
            description: speaker.bio || undefined,
          }}
        />
      )}
      <PlaceholderAvatar src={speaker.photo} alt={name} size={72} />
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {isTba ? (
          <StatusBadge tone="tba" />
        ) : (
          <>
            {(speaker.designation || speaker.organization) && (
              <p className={styles.designation}>
                {[speaker.designation, speaker.organization].filter(Boolean).join(' · ')}
              </p>
            )}
            {speaker.bio && <p className={styles.bio}>{speaker.bio}</p>}
            {sessions.map((session) => (
              <p className={styles.session} key={session.id}>
                {session.title}
                {session.startTime ? ` · ${formatSessionDateTime(session.startTime)}` : ' · Time TBA'}
              </p>
            ))}
            {speaker.socials.length > 0 && (
              <div className={styles.socials}>
                {speaker.socials.map((social) => (
                  <ExternalLink href={social.url} key={social.platform}>
                    {social.platform}
                  </ExternalLink>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
