import type { ComponentType } from 'react';
import { GithubIcon, LinkedinIcon, XIcon, YoutubeIcon, GlobeIcon } from './Icons';

/**
 * Known platforms get their real mark; anything else falls back to the
 * platform name as text. Shared so the footer and speaker cards can't drift.
 */
export const SOCIAL_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  twitter: XIcon,
  youtube: YoutubeIcon,
  website: GlobeIcon,
  web: GlobeIcon,
  site: GlobeIcon,
};
