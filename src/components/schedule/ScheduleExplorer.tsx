'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Session, SiteConfig } from '@/lib/types';
import { getEventDays, sortSessions, getCurrentAndNextSession } from '@/lib/schedule';
import { EmptyState } from '@/components/shared/EmptyState';
import { CalendarIcon, SearchIcon, DownloadIcon, InfoIcon } from '@/components/shared/Icons';
import { TimelineSession } from './TimelineSession';
import { LiveNowCard, UpNextCard, SessionTypeLegend, MissingSomethingCard } from './ScheduleSidebar';
import { FILTERABLE_TYPES, SESSION_VISUALS } from './sessionVisuals';
import styles from './ScheduleExplorer.module.css';

type Filter = 'all' | Session['type'];

export function ScheduleExplorer({ sessions, config }: { sessions: Session[]; config: SiteConfig }) {
  const days = useMemo(() => getEventDays(sessions), [sessions]);
  const [activeDay, setActiveDay] = useState(days[0] ?? 1);
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  // "Now" only advances client-side; the prerendered HTML has no live state.
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const { current, next } = useMemo(
    () =>
      now
        ? getCurrentAndNextSession(sessions, config, now)
        : { current: null, next: null },
    [sessions, config, now],
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sortSessions(sessions).filter((session) => {
      if (session.day !== activeDay) return false;
      if (filter !== 'all' && session.type !== filter) return false;
      if (!needle) return true;
      return (
        session.title.toLowerCase().includes(needle) ||
        session.description.toLowerCase().includes(needle)
      );
    });
  }, [sessions, activeDay, filter, query]);

  // An .ics export would be meaningless without real calendar dates.
  const datesConfirmed = config.event.datesConfirmed && Boolean(config.event.startDate);

  const availableTypes = useMemo(() => {
    const present = new Set(sessions.map((s) => s.type));
    return FILTERABLE_TYPES.filter((type) => present.has(type));
  }, [sessions]);

  return (
    <>
      <div className={styles.dayBar}>
        <div className={styles.days} role="tablist" aria-label="Event days">
          {days.map((day) => (
            <button
              key={day}
              type="button"
              role="tab"
              aria-selected={day === activeDay}
              onClick={() => setActiveDay(day)}
              className={`${styles.day} ${day === activeDay ? styles.dayActive : ''}`}
            >
              <CalendarIcon size={18} className={styles.dayIcon} />
              <span>
                <span className={styles.dayLabel}>Day {day}</span>
                <span className={styles.dayDate}>{datesConfirmed ? '' : 'TBA'}</span>
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className={styles.download}
          disabled={!datesConfirmed}
          title={
            datesConfirmed
              ? 'Download the schedule'
              : 'Available once the event dates are confirmed'
          }
        >
          Download Schedule
          <DownloadIcon size={16} />
        </button>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.filters}>
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`${styles.pill} ${filter === 'all' ? styles.pillActive : ''}`}
          >
            All Sessions
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFilter(type)}
              className={`${styles.pill} ${filter === type ? styles.pillActive : ''}`}
            >
              {SESSION_VISUALS[type].label}
            </button>
          ))}
        </div>

        <div className={styles.search}>
          <label className="visually-hidden" htmlFor="session-search">
            Search sessions
          </label>
          <input
            id="session-search"
            type="search"
            className={styles.searchInput}
            placeholder="Search sessions..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <SearchIcon size={18} className={styles.searchIcon} />
        </div>
      </div>

      <div className={styles.layout}>
        <div>
          {visible.length === 0 ? (
            <EmptyState
              message={
                query || filter !== 'all'
                  ? 'No sessions match your filters.'
                  : 'Sessions for this day will be announced soon.'
              }
            />
          ) : (
            visible.map((session, index) => (
              <TimelineSession
                key={session.id}
                session={session}
                isLive={current?.id === session.id}
                isLast={index === visible.length - 1}
              />
            ))
          )}

          <p className={styles.note}>
            <InfoIcon size={15} />
            Schedule is subject to change. Please check back for updates.
          </p>
        </div>

        <aside className={styles.sidebar}>
          <LiveNowCard session={current} />
          <UpNextCard session={next} config={config} now={now ?? new Date()} />
          <SessionTypeLegend />
          <MissingSomethingCard />
        </aside>
      </div>
    </>
  );
}
