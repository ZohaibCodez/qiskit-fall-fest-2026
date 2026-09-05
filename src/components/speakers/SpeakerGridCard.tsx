import Image from 'next/image';
import type { Speaker } from '@/lib/types';
import { getSessionsForSpeaker } from '@/lib/content';
import { PlaceholderAvatar } from '@/components/shared/PlaceholderAvatar';
import { ExternalLink } from '@/components/shared/ExternalLink';
import { SOCIAL_ICONS } from '@/components/shared/socialIcons';
import { SESSION_VISUALS } from '@/components/schedule/sessionVisuals';
import tileStyles from '@/components/shared/IconTile.module.css';
import styles from './SpeakerGridCard.module.css';

export function SpeakerGridCard({ speaker }: { speaker: Speaker }) {
  const isTba = speaker.status === 'tba';
  const sessions = getSessionsForSpeaker(speaker.id);
  // The badge shows what the slot is for, which is meaningful even when the
  // person filling it isn't confirmed yet.
  const primaryVisual = sessions.length ? SESSION_VISUALS[sessions[0].type] : null;
  const name = isTba ? 'Speaker TBA' : speaker.name;

  return (
    <article className={styles.card}>
      {isTba ? (
        <div className={styles.mediaTba}>
          <span className={`${styles.badge} ${styles.badgeTba}`}>TBA</span>
          <PlaceholderAvatar src={null} alt="" size={104} />
        </div>
      ) : (
        <div className={styles.media}>
          {primaryVisual && (
            <span className={`${styles.badge} ${tileStyles[primaryVisual.tone]}`}>{primaryVisual.label}</span>
          )}
          {speaker.photo ? (
            <Image src={speaker.photo} alt={name} fill className={styles.photo} sizes="(max-width: 720px) 100vw, 300px" />
          ) : (
            <div className={styles.mediaTba}>
              <PlaceholderAvatar src={null} alt="" size={104} />
            </div>
          )}
        </div>
      )}

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>

        {isTba ? (
          <>
            <p className={styles.designation}>Details coming soon</p>
            <p className={styles.organization}>TBA</p>
            <p className={styles.bio}>Speaker details will be announced shortly.</p>
          </>
        ) : (
          <>
            {speaker.designation && <p className={styles.designation}>{speaker.designation}</p>}
            {speaker.organization && <p className={styles.organization}>{speaker.organization}</p>}
            {speaker.bio && <p className={styles.bio}>{speaker.bio}</p>}
          </>
        )}

        <div className={styles.sessions}>
          <p className={styles.sessionsLabel}>Sessions</p>
          <ul className={styles.sessionList}>
            {sessions.length > 0 ? (
              sessions.map((session) => <li key={session.id}>{session.title}</li>)
            ) : (
              <li>To be announced</li>
            )}
          </ul>

          {speaker.socials.length > 0 && (
            <div className={styles.socials}>
              {speaker.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform.toLowerCase()];
                return (
                  <ExternalLink
                    href={social.url}
                    key={social.platform}
                    className={styles.social}
                    aria-label={`${name} on ${social.platform}`}
                  >
                    {Icon ? <Icon size={17} /> : social.platform}
                  </ExternalLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
