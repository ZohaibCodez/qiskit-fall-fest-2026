/**
 * Inline SVG icon set — never emoji, per the accessibility/style baseline in
 * PROJECT_PLAN.md. All icons share a 24px grid and 1.6 stroke width so they
 * stay visually consistent, and inherit `currentColor` for theming.
 */

type IconProps = { size?: number; className?: string };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export function CalendarIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}

export function MapPinIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M20 10c0 5.5-8 12-8 12s-8-6.5-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.8" />
    </svg>
  );
}

export function MonitorIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8.5 21h7M12 17v4" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function UsersIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16.5 5.2a3.4 3.4 0 0 1 0 5.6M18 14.4a6.5 6.5 0 0 1 3.5 5.6" />
    </svg>
  );
}

export function CodeIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8.5 8.5 4 12l4.5 3.5M15.5 8.5 20 12l-4.5 3.5M13.5 5l-3 14" />
    </svg>
  );
}

export function ChatIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M20.5 12.4c0 3.9-3.8 7-8.5 7a9.9 9.9 0 0 1-2.6-.34L4.5 20.5l1.2-3.4a6.6 6.6 0 0 1-2.2-4.7c0-3.9 3.8-7 8.5-7s8.5 3.1 8.5 7Z" />
    </svg>
  );
}

export function CloudIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 18.5a4.2 4.2 0 0 1-.4-8.38 5.6 5.6 0 0 1 10.86-1.2A3.9 3.9 0 0 1 17.6 18.5H7Z" />
    </svg>
  );
}

export function GiftIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="9.5" width="18" height="11" rx="1.6" />
      <path d="M3 13.5h18M12 9.5v11" />
      <path d="M12 9.5S10.6 4 8.2 4a2.2 2.2 0 0 0 0 5.5M12 9.5S13.4 4 15.8 4a2.2 2.2 0 0 1 0 5.5" />
    </svg>
  );
}

export function MicIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="9" y="2.6" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3.4M8.6 21.4h6.8" />
    </svg>
  );
}

export function FlaskIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9.5 3v6.2L4.6 17.6A2 2 0 0 0 6.3 20.7h11.4a2 2 0 0 0 1.7-3.1L14.5 9.2V3" />
      <path d="M8.4 3h7.2M7.4 14.6h9.2" />
    </svg>
  );
}

export function TrophyIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4.4v1.6A3.4 3.4 0 0 0 7.6 10.5M17 5.5h2.6v1.6a3.4 3.4 0 0 1-3.2 3.4" />
      <path d="M12 14v3.6M8.6 20.4h6.8l-.6-2.8H9.2l-.6 2.8Z" />
    </svg>
  );
}

export function PresentationIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="3.6" width="18" height="12" rx="1.8" />
      <path d="M12 15.6v3M8.4 21l3.6-2.4L15.6 21M8 11.4l2.6-2.8 2 2 3.4-3.6" />
    </svg>
  );
}

export function SparklesIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.4 13.7 8l4.6 1.7-4.6 1.7L12 16l-1.7-4.6L5.7 9.7 10.3 8 12 3.4Z" />
      <path d="M18.6 15.2l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1Z" />
    </svg>
  );
}

export function NetworkIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="4.6" r="2.4" />
      <circle cx="4.8" cy="18.4" r="2.4" />
      <circle cx="19.2" cy="18.4" r="2.4" />
      <path d="M10.4 6.6 6.2 16.2M13.6 6.6l4.2 9.6M7.2 18.4h9.6" />
    </svg>
  );
}

export function RocketIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 2.5c3.1 2.3 4.9 5.9 4.9 9.7l-1.6 3.6H8.7l-1.6-3.6c0-3.8 1.8-7.4 4.9-9.7Z" />
      <circle cx="12" cy="9.6" r="2.1" />
      <path d="M7.1 11.4 4.3 14.2a1.4 1.4 0 0 0-.4 1v3.1l3.2-2.1M16.9 11.4l2.8 2.8c.26.27.4.63.4 1v3.1l-3.2-2.1" />
      <path d="M9.9 18.4c.5 1.6 1.2 2.7 2.1 3.6.9-.9 1.6-2 2.1-3.6" />
    </svg>
  );
}

/* ---------- Brand marks (filled, no stroke — they're logos, not UI icons) ---------- */

const brandBase = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  'aria-hidden': true,
});

export function GithubIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...brandBase(size)} className={className}>
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.5 9.5 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

export function LinkedinIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...brandBase(size)} className={className}>
      <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 21h-3.37v-6.1c0-1.45-.03-3.32-2.02-3.32-2.03 0-2.34 1.58-2.34 3.21V21H9.34V8.5h3.23v1.71h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17V21Z" />
    </svg>
  );
}

export function XIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...brandBase(size)} className={className}>
      <path d="M17.53 3h3.2l-7 8 8.23 10h-6.44l-5.04-6.15L4.7 21H1.5l7.49-8.56L1.1 3h6.6l4.56 5.62L17.53 3Zm-1.12 16.1h1.77L7.68 4.8H5.78l10.63 14.3Z" />
    </svg>
  );
}

export function YoutubeIcon({ size = 20, className }: IconProps) {
  return (
    <svg {...brandBase(size)} className={className}>
      <path d="M22.2 7.4a2.7 2.7 0 0 0-1.9-1.9C18.6 5 12 5 12 5s-6.6 0-8.3.46A2.7 2.7 0 0 0 1.8 7.4 28.2 28.2 0 0 0 1.34 12c0 1.55.15 3.1.46 4.6a2.7 2.7 0 0 0 1.9 1.9C5.4 19 12 19 12 19s6.6 0 8.3-.5a2.7 2.7 0 0 0 1.9-1.9c.3-1.5.46-3.05.46-4.6 0-1.55-.15-3.1-.46-4.6ZM9.9 15.2V8.8l5.5 3.2-5.5 3.2Z" />
    </svg>
  );
}
