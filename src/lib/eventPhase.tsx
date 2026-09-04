'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { EventPhase, Session, SiteConfig } from './types';

const REFRESH_INTERVAL_MS = 60_000;

/**
 * The one place `before | during | after` is computed. Must run client-side:
 * static export bakes HTML once at build time, so a build-time phase check
 * would freeze forever at whatever was true when the site was last deployed.
 */
export function computeEventPhase(config: SiteConfig, now: Date): EventPhase {
  if (config.phaseOverride) return config.phaseOverride;
  if (!config.event.startDate || !config.event.endDate) return 'before';
  const start = new Date(config.event.startDate);
  const end = new Date(config.event.endDate);
  if (now < start) return 'before';
  if (now > end) return 'after';
  return 'during';
}

export function getCurrentAndNextSession(schedule: Session[], now: Date) {
  const timed = schedule
    .filter((s) => s.status === 'confirmed' && s.startTime && s.endTime)
    .map((s) => ({
      session: s,
      start: new Date(s.startTime as string),
      end: new Date(s.endTime as string),
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  const current = timed.find((s) => now >= s.start && now <= s.end)?.session ?? null;
  const next = timed.find((s) => s.start > now)?.session ?? null;

  return { current, next };
}

const EventPhaseContext = createContext<EventPhase>('before');

export function EventPhaseProvider({
  config,
  children,
}: {
  config: SiteConfig;
  children: React.ReactNode;
}) {
  const [phase, setPhase] = useState<EventPhase>(() => computeEventPhase(config, new Date()));

  useEffect(() => {
    setPhase(computeEventPhase(config, new Date()));
    const id = setInterval(() => {
      setPhase(computeEventPhase(config, new Date()));
    }, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [config]);

  return <EventPhaseContext.Provider value={phase}>{children}</EventPhaseContext.Provider>;
}

export function useEventPhase(): EventPhase {
  return useContext(EventPhaseContext);
}
