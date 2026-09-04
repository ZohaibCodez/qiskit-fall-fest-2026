import type { ReactNode } from 'react';
import type { Session, SessionType } from '@/lib/types';
import { getSpeakersForSession } from '@/lib/content';
import { formatSessionTime } from '@/lib/format';
import { IconTile, type TileTone } from '@/components/shared/IconTile';
import {
  MicIcon,
  CodeIcon,
  FlaskIcon,
  TrophyIcon,
  ChatIcon,
  UsersIcon,
  SparklesIcon,
} from '@/components/shared/Icons';
import styles from './SessionRow.module.css';

const TYPE_VISUALS: Record<SessionType, { node: ReactNode; tone: TileTone }> = {
  keynote: { node: <MicIcon size={20} />, tone: 'blue' },
  talk: { node: <CodeIcon size={20} />, tone: 'violet' },
  workshop: { node: <FlaskIcon size={20} />, tone: 'green' },
  challenge: { node: <TrophyIcon size={20} />, tone: 'amber' },
  panel: { node: <ChatIcon size={20} />, tone: 'pink' },
  networking: { node: <UsersIcon size={20} />, tone: 'cyan' },
  break: { node: <SparklesIcon size={20} />, tone: 'amber' },
  ceremony: { node: <MicIcon size={20} />, tone: 'blue' },
  other: { node: <SparklesIcon size={20} />, tone: 'violet' },
};

function SessionRow({ session }: { session: Session }) {
  const visual = TYPE_VISUALS[session.type] ?? TYPE_VISUALS.other;
  const speakers = getSpeakersForSession(session.id);
  const speakerLabel = speakers.length
    ? speakers.map((s) => (s.status === 'tba' ? 'TBA' : s.name)).join(', ')
    : 'TBA';

  return (
    <div className={styles.row}>
      <IconTile tone={visual.tone} size="md">
        {visual.node}
      </IconTile>
      <div className={styles.body}>
        <p className={styles.title}>{session.title}</p>
        <p className={styles.speaker}>{speakerLabel}</p>
      </div>
      <div className={styles.meta}>
        {session.startTime ? formatSessionTime(session.startTime) : 'TBA'}
        <span className={styles.metaRoom}>{session.location.room || 'TBA'}</span>
      </div>
    </div>
  );
}

export function SessionRowList({ sessions }: { sessions: Session[] }) {
  return (
    <div className={styles.list}>
      {sessions.map((session) => (
        <SessionRow key={session.id} session={session} />
      ))}
    </div>
  );
}
