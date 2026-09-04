import siteConfigJson from '@content/site.config.json';
import scheduleJson from '@content/schedule.json';
import speakersJson from '@content/speakers.json';
import teamJson from '@content/team.json';
import activitiesJson from '@content/activities.json';
import resourcesJson from '@content/resources.json';
import faqJson from '@content/faq.json';
import galleryJson from '@content/gallery.json';
import testimonialsJson from '@content/testimonials.json';
import announcementsJson from '@content/announcements.json';

import type {
  SiteConfig,
  Session,
  Speaker,
  TeamMember,
  Activity,
  Resource,
  FaqEntry,
  GalleryPhoto,
  Testimonial,
  Announcement,
  ResourceVisibility,
} from './types';
import { validateContent } from './validateContent';

export const siteConfig = siteConfigJson as SiteConfig;
export const schedule = scheduleJson as Session[];
export const speakers = speakersJson as Speaker[];
export const team = teamJson as TeamMember[];
export const activities = activitiesJson as Activity[];
export const resources = resourcesJson as Resource[];
export const faq = (faqJson as FaqEntry[]).slice().sort((a, b) => a.order - b.order);
export const gallery = galleryJson as GalleryPhoto[];
export const testimonials = testimonialsJson as Testimonial[];
export const announcements = announcementsJson as Announcement[];

// Runs once at module load. A dangling ID reference or invalid enum value
// throws here, which fails `next build` — turning a content typo into a
// build error instead of a silently broken page.
validateContent({
  schedule,
  speakers,
  team,
  activities,
  resources,
  faq,
  gallery,
  testimonials,
  announcements,
});

export function getSessionById(id: string): Session | undefined {
  return schedule.find((s) => s.id === id);
}

export function getSpeakerById(id: string): Speaker | undefined {
  return speakers.find((s) => s.id === id);
}

export function getSpeakersForSession(sessionId: string): Speaker[] {
  return speakers.filter((s) => s.sessionIds.includes(sessionId));
}

export function getSessionsForSpeaker(speakerId: string): Session[] {
  const speaker = getSpeakerById(speakerId);
  if (!speaker) return [];
  return speaker.sessionIds
    .map(getSessionById)
    .filter((s): s is Session => Boolean(s));
}

export function getResourcesByCategory(category: Resource['category'], visibility: ResourceVisibility[]) {
  return resources.filter((r) => r.category === category && visibility.includes(r.visibleFrom));
}
