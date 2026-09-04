import type { Speaker } from '@/lib/types';
import { getSessionsForSpeaker } from '@/lib/content';
import { PlaceholderAvatar } from '@/components/shared/PlaceholderAvatar';
import styles from './SpeakerTile.module.css';

const TYPE_LABELS: Record<string, string> = {
  keynote: 'Keynote',
  talk: 'Talk',
  workshop: 'Workshop',
  challenge: 'Challenge',
  panel: 'Panel',
  networking: 'Networking',
  break: 'Break',
  ceremony: 'Ceremony',
  other: 'Session',
};

export function SpeakerTile({ speaker }: { speaker: Speaker }) {
  const isTba = speaker.status === 'tba';
  const name = isTba ? 'Speaker TBA' : speaker.name;
  const affiliation = [speaker.designation, speaker.organization].filter(Boolean).join(', ');
  // A TBA speaker still has a known slot — showing the session type says what
  // the slot is for without inventing who's filling it.
  const session = getSessionsForSpeaker(speaker.id)[0];

  return (
    <article className={styles.tile}>
      <PlaceholderAvatar src={speaker.photo} alt={name} size={80} />
      {isTba && <p className={styles.status}>TBA</p>}
      <p className={styles.name}>{name}</p>
      <p className={styles.affiliation}>{affiliation || 'Affiliation TBA'}</p>
      {session && <span className={styles.pill}>{TYPE_LABELS[session.type] ?? 'Session'}</span>}
    </article>
  );
}
