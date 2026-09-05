'use client';

import { useMemo, useState } from 'react';
import type { Session, Speaker, SpeakerCategory, SessionType } from '@/lib/types';
import { EmptyState } from '@/components/shared/EmptyState';
import { SearchIcon } from '@/components/shared/Icons';
import { SESSION_VISUALS } from '@/components/schedule/sessionVisuals';
import { SpeakerGridCard } from './SpeakerGridCard';
import styles from './SpeakersExplorer.module.css';

type Filter = { kind: 'all' } | { kind: 'session'; value: SessionType } | { kind: 'category'; value: SpeakerCategory };
type SortKey = 'name-asc' | 'name-desc' | 'organization';

const CATEGORY_LABELS: Record<SpeakerCategory, string> = {
  industry: 'Industry',
  researcher: 'Researchers',
  educator: 'Educators',
  developer: 'Developers',
};

// Session types worth offering as speaker filters (a "break" has no speaker).
const SESSION_FILTERS: SessionType[] = ['keynote', 'talk', 'workshop', 'panel'];

export function SpeakersExplorer({ speakers, sessions }: { speakers: Speaker[]; sessions: Session[] }) {
  const [filter, setFilter] = useState<Filter>({ kind: 'all' });
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('name-asc');

  const sessionById = useMemo(() => new Map(sessions.map((s) => [s.id, s])), [sessions]);

  const typesForSpeaker = useMemo(() => {
    const map = new Map<string, Set<SessionType>>();
    speakers.forEach((speaker) => {
      const types = new Set<SessionType>();
      speaker.sessionIds.forEach((id) => {
        const session = sessionById.get(id);
        if (session) types.add(session.type);
      });
      map.set(speaker.id, types);
    });
    return map;
  }, [speakers, sessionById]);

  // Only offer a pill when data actually contains it — no dead filters.
  const availableSessionFilters = useMemo(
    () => SESSION_FILTERS.filter((type) => [...typesForSpeaker.values()].some((set) => set.has(type))),
    [typesForSpeaker],
  );
  const availableCategories = useMemo(
    () => Array.from(new Set(speakers.map((s) => s.category).filter((c): c is SpeakerCategory => Boolean(c)))),
    [speakers],
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = speakers.filter((speaker) => {
      if (filter.kind === 'session' && !typesForSpeaker.get(speaker.id)?.has(filter.value)) return false;
      if (filter.kind === 'category' && speaker.category !== filter.value) return false;
      if (!needle) return true;
      return [speaker.name, speaker.designation, speaker.organization, speaker.bio]
        .join(' ')
        .toLowerCase()
        .includes(needle);
    });

    // TBA slots always sort last — confirmed speakers are the point of the page.
    return filtered.sort((a, b) => {
      const aTba = a.status === 'tba';
      const bTba = b.status === 'tba';
      if (aTba !== bTba) return aTba ? 1 : -1;

      if (sort === 'organization') return a.organization.localeCompare(b.organization);
      const compare = a.name.localeCompare(b.name);
      return sort === 'name-desc' ? -compare : compare;
    });
  }, [speakers, filter, query, sort, typesForSpeaker]);

  const isActive = (candidate: Filter) =>
    candidate.kind === filter.kind &&
    (candidate.kind === 'all' || ('value' in candidate && 'value' in filter && candidate.value === filter.value));

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.filters}>
          <button
            type="button"
            onClick={() => setFilter({ kind: 'all' })}
            className={`${styles.pill} ${filter.kind === 'all' ? styles.pillActive : ''}`}
          >
            All Speakers
          </button>

          {availableSessionFilters.map((type) => {
            const candidate: Filter = { kind: 'session', value: type };
            return (
              <button
                key={type}
                type="button"
                onClick={() => setFilter(candidate)}
                className={`${styles.pill} ${isActive(candidate) ? styles.pillActive : ''}`}
              >
                {SESSION_VISUALS[type].label}
              </button>
            );
          })}

          {availableCategories.map((category) => {
            const candidate: Filter = { kind: 'category', value: category };
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(candidate)}
                className={`${styles.pill} ${isActive(candidate) ? styles.pillActive : ''}`}
              >
                {CATEGORY_LABELS[category]}
              </button>
            );
          })}
        </div>

        <div className={styles.tools}>
          <div className={styles.search}>
            <label className="visually-hidden" htmlFor="speaker-search">
              Search speakers
            </label>
            <input
              id="speaker-search"
              type="search"
              className={styles.searchInput}
              placeholder="Search speakers..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <SearchIcon size={18} className={styles.searchIcon} />
          </div>

          <label className="visually-hidden" htmlFor="speaker-sort">
            Sort speakers
          </label>
          <select
            id="speaker-sort"
            className={styles.sort}
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
          >
            <option value="name-asc">Sort by: Name (A–Z)</option>
            <option value="name-desc">Sort by: Name (Z–A)</option>
            <option value="organization">Sort by: Organization</option>
          </select>
        </div>
      </div>

      {visible.length === 0 ? (
        <EmptyState
          message={
            query || filter.kind !== 'all'
              ? 'No speakers match your filters.'
              : 'Speakers will be announced soon.'
          }
        />
      ) : (
        <div className={styles.grid}>
          {visible.map((speaker) => (
            <SpeakerGridCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      )}
    </>
  );
}
