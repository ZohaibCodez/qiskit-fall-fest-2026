import type { ReactNode } from 'react';
import type { HighlightIcon } from '@/lib/types';
import type { TileTone } from './IconTile';
import {
  UsersIcon,
  CodeIcon,
  ChatIcon,
  CloudIcon,
  GiftIcon,
  TrophyIcon,
  SparklesIcon,
  LaptopIcon,
  NetworkIcon,
} from './Icons';

/** Shared icon/tint mapping for highlight-style items (home strip, activities hero). */
export const HIGHLIGHT_ICONS: Record<HighlightIcon, { node: ReactNode; tone: TileTone }> = {
  users: { node: <UsersIcon />, tone: 'blue' },
  code: { node: <CodeIcon />, tone: 'violet' },
  chat: { node: <ChatIcon />, tone: 'cyan' },
  cloud: { node: <CloudIcon />, tone: 'blue' },
  gift: { node: <GiftIcon />, tone: 'amber' },
  trophy: { node: <TrophyIcon />, tone: 'green' },
  sparkles: { node: <SparklesIcon />, tone: 'pink' },
  laptop: { node: <LaptopIcon />, tone: 'violet' },
  network: { node: <NetworkIcon />, tone: 'cyan' },
};
