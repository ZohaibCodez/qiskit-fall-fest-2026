import type { ReactNode } from 'react';
import type { SessionType } from '@/lib/types';
import type { TileTone } from '@/components/shared/IconTile';
import {
  MicIcon,
  CodeIcon,
  FlaskIcon,
  TrophyIcon,
  ChatIcon,
  UsersIcon,
  SparklesIcon,
  FlagIcon,
} from '@/components/shared/Icons';

/**
 * One place mapping session type → icon, tint and label, shared by the
 * timeline, the compact home rows and the session-type legend, so a type
 * never renders as a different colour in two places.
 */
export const SESSION_VISUALS: Record<
  SessionType,
  { node: ReactNode; tone: TileTone; label: string; blurb: string }
> = {
  talk: { node: <MicIcon size={20} />, tone: 'blue', label: 'Talk', blurb: 'Presentations and keynotes' },
  keynote: { node: <MicIcon size={20} />, tone: 'blue', label: 'Keynote', blurb: 'Headline presentations' },
  workshop: { node: <FlaskIcon size={20} />, tone: 'violet', label: 'Workshop', blurb: 'Hands-on learning sessions' },
  challenge: { node: <TrophyIcon size={20} />, tone: 'amber', label: 'Challenge', blurb: 'Team challenges and competitions' },
  panel: { node: <UsersIcon size={20} />, tone: 'blue', label: 'Panel', blurb: 'Panel discussions' },
  networking: { node: <ChatIcon size={20} />, tone: 'pink', label: 'Networking', blurb: 'Networking and social sessions' },
  ceremony: { node: <FlagIcon size={20} />, tone: 'violet', label: 'Ceremony', blurb: 'Opening / closing ceremonies' },
  break: { node: <SparklesIcon size={20} />, tone: 'amber', label: 'Break', blurb: 'Breaks and refreshments' },
  other: { node: <CodeIcon size={20} />, tone: 'cyan', label: 'Session', blurb: 'Other sessions' },
};

/** Types offered as filter pills / legend entries, in display order. */
export const FILTERABLE_TYPES: SessionType[] = [
  'talk',
  'workshop',
  'challenge',
  'panel',
  'networking',
  'ceremony',
];
