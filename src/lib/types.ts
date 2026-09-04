// Schema contracts for everything under /content. Keep in sync with the
// field reference in PROJECT_PLAN.md — that file is the human-readable
// version of these types for non-developer contributors.

export type RegistrationStatus = 'coming-soon' | 'open' | 'closed';
export type EventFormat = 'in-person' | 'virtual' | 'hybrid' | 'tba';
export type EventPhase = 'before' | 'during' | 'after';
export type ConfirmationStatus = 'confirmed' | 'tba';

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteConfig {
  event: {
    name: string;
    chapterName: string;
    theme: string;
    description: string;
    format: EventFormat;
    startDate: string | null; // ISO 8601 with offset
    endDate: string | null;
    datesConfirmed: boolean;
    venue: {
      name: string;
      address: string;
      mapUrl: string | null;
      onlineUrl: string | null;
    };
  };
  registration: {
    status: RegistrationStatus;
    url: string | null;
    deadline: string | null;
    cost: string;
    notes: string;
  };
  phaseOverride: EventPhase | null;
  contact: {
    email: string;
    communityUrl: string | null;
    socials: SocialLink[];
  };
  archive: {
    attendeesCount: number | null;
    finalReportUrl: string | null;
  };
}

export type SessionType =
  | 'keynote'
  | 'talk'
  | 'workshop'
  | 'challenge'
  | 'panel'
  | 'networking'
  | 'break'
  | 'ceremony'
  | 'other';

export interface Session {
  id: string;
  title: string;
  type: SessionType;
  status: ConfirmationStatus;
  startTime: string | null;
  endTime: string | null;
  durationMinutes: number | null;
  description: string;
  speakerIds: string[];
  location: {
    room: string;
    isOnline: boolean;
    onlineUrl: string | null;
  };
}

export interface Speaker {
  id: string;
  status: ConfirmationStatus;
  name: string;
  designation: string;
  organization: string;
  photo: string | null;
  bio: string;
  sessionIds: string[];
  socials: SocialLink[];
}

export type TeamRole =
  | 'Lead Organizer'
  | 'Co-Organizer'
  | 'Website & Docs Lead'
  | 'Marketing & Outreach Lead'
  | 'Event Operations Lead'
  | 'Audience & Participant Lead'
  | 'Other';

export interface TeamMember {
  id: string;
  role: TeamRole;
  status: ConfirmationStatus;
  name: string;
  photo: string | null;
  socialUrl: string | null;
}

export type ActivityType =
  | 'keynote'
  | 'talk'
  | 'workshop'
  | 'challenge'
  | 'panel'
  | 'networking'
  | 'demo'
  | 'other';

export type ActivityStatus = 'planned' | 'not-planned' | 'tba';

export interface Activity {
  id: string;
  title: string;
  type: ActivityType;
  status: ActivityStatus;
  description: string;
  timing: string | null;
  sessionId: string | null;
}

export type ResourceCategory =
  | 'beginner-quantum'
  | 'qiskit-docs'
  | 'ibm-quantum'
  | 'tutorials'
  | 'workshop-materials'
  | 'github-repos'
  | 'challenge'
  | 'recordings';

export type ResourceVisibility = 'always' | 'after-event';

export interface Resource {
  id: string;
  category: ResourceCategory;
  title: string;
  url: string;
  description: string;
  visibleFrom: ResourceVisibility;
}

export interface FaqEntry {
  id: string;
  order: number;
  question: string;
  answer: string;
}

export type GalleryCategory =
  | 'opening'
  | 'sessions'
  | 'workshop'
  | 'participants'
  | 'networking'
  | 'closing';

export type GalleryPhotoStatus = 'available' | 'placeholder';

export interface GalleryPhoto {
  id: string;
  category: GalleryCategory;
  src: string | null;
  caption: string | null;
  status: GalleryPhotoStatus;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo: string | null;
}

export type AnnouncementPriority = 'normal' | 'urgent';

export interface Announcement {
  id: string;
  timestamp: string;
  message: string;
  priority: AnnouncementPriority;
}
