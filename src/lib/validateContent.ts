import type {
  Session,
  Speaker,
  TeamMember,
  Activity,
  Resource,
  FaqEntry,
  GalleryPhoto,
  Testimonial,
  Announcement,
  SessionType,
  ConfirmationStatus,
  TeamRole,
  ActivityType,
  ActivityStatus,
  ResourceCategory,
  GalleryCategory,
} from './types';

const SESSION_TYPES: SessionType[] = [
  'keynote', 'talk', 'workshop', 'challenge', 'panel', 'networking', 'break', 'ceremony', 'other',
];
const CONFIRMATION_STATUSES: ConfirmationStatus[] = ['confirmed', 'tba'];
const TEAM_ROLES: TeamRole[] = [
  'Lead Organizer', 'Co-Organizer', 'Website & Docs Lead', 'Marketing & Outreach Lead',
  'Event Operations Lead', 'Audience & Participant Lead', 'Other',
];
const ACTIVITY_TYPES: ActivityType[] = [
  'keynote', 'talk', 'workshop', 'challenge', 'panel', 'networking', 'demo', 'other',
];
const ACTIVITY_STATUSES: ActivityStatus[] = ['planned', 'not-planned', 'tba'];
const RESOURCE_CATEGORIES: ResourceCategory[] = [
  'beginner-quantum', 'qiskit-docs', 'ibm-quantum', 'tutorials',
  'workshop-materials', 'github-repos', 'challenge', 'recordings',
];
const GALLERY_CATEGORIES: GalleryCategory[] = [
  'opening', 'sessions', 'workshop', 'participants', 'networking', 'closing',
];

function fail(message: string): never {
  throw new Error(`[content validation] ${message}`);
}

function checkEnum<T extends string>(value: string, allowed: T[], where: string) {
  if (!allowed.includes(value as T)) {
    fail(`${where}: invalid value "${value}" — expected one of ${allowed.join(', ')}`);
  }
}

export function validateContent(data: {
  schedule: Session[];
  speakers: Speaker[];
  team: TeamMember[];
  activities: Activity[];
  resources: Resource[];
  faq: FaqEntry[];
  gallery: GalleryPhoto[];
  testimonials: Testimonial[];
  announcements: Announcement[];
}) {
  const sessionIds = new Set(data.schedule.map((s) => s.id));
  const speakerIds = new Set(data.speakers.map((s) => s.id));

  const CLOCK_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

  data.schedule.forEach((session, i) => {
    const where = `schedule[${i}] (${session.id})`;
    checkEnum(session.type, SESSION_TYPES, where);
    checkEnum(session.status, CONFIRMATION_STATUSES, `${where}.status`);

    if (!Number.isInteger(session.day) || session.day < 1) {
      fail(`${where}.day must be a whole number of 1 or more (got ${session.day})`);
    }
    (['start', 'end'] as const).forEach((field) => {
      const value = session[field];
      if (value !== null && !CLOCK_RE.test(value)) {
        fail(`${where}.${field} must be "HH:MM" 24-hour time or null (got "${value}")`);
      }
    });
    if (session.end && !session.start) {
      fail(`${where} has an end time but no start time`);
    }

    session.speakerIds.forEach((id) => {
      if (!speakerIds.has(id)) {
        fail(`${where} references unknown speakerId "${id}"`);
      }
    });
  });

  data.speakers.forEach((speaker, i) => {
    checkEnum(speaker.status, CONFIRMATION_STATUSES, `speakers[${i}] (${speaker.id}).status`);
    speaker.sessionIds.forEach((id) => {
      if (!sessionIds.has(id)) {
        fail(`speakers[${i}] (${speaker.id}) references unknown sessionId "${id}"`);
      }
    });
  });

  data.team.forEach((member, i) => {
    checkEnum(member.role, TEAM_ROLES, `team[${i}] (${member.id}).role`);
    checkEnum(member.status, CONFIRMATION_STATUSES, `team[${i}] (${member.id}).status`);
  });

  data.activities.forEach((activity, i) => {
    checkEnum(activity.type, ACTIVITY_TYPES, `activities[${i}] (${activity.id}).type`);
    checkEnum(activity.status, ACTIVITY_STATUSES, `activities[${i}] (${activity.id}).status`);
    if (activity.sessionId && !sessionIds.has(activity.sessionId)) {
      fail(`activities[${i}] (${activity.id}) references unknown sessionId "${activity.sessionId}"`);
    }
  });

  data.resources.forEach((resource, i) => {
    checkEnum(resource.category, RESOURCE_CATEGORIES, `resources[${i}] (${resource.id}).category`);
  });

  data.gallery.forEach((photo, i) => {
    checkEnum(photo.category, GALLERY_CATEGORIES, `gallery[${i}] (${photo.id}).category`);
    if (photo.status === 'available' && !photo.src) {
      fail(`gallery[${i}] (${photo.id}) is marked "available" but has no src`);
    }
  });

  const faqIds = new Set<string>();
  data.faq.forEach((entry, i) => {
    if (faqIds.has(entry.id)) fail(`faq[${i}] duplicate id "${entry.id}"`);
    faqIds.add(entry.id);
  });
}
