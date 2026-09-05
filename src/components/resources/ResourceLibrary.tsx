'use client';

import { useMemo, useState, type ReactNode } from 'react';
import type { Resource, ResourceCategory } from '@/lib/types';
import { IconTile, type TileTone } from '@/components/shared/IconTile';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  BookIcon,
  CodeIcon,
  CloudIcon,
  FlaskIcon,
  TrophyIcon,
  PlayIcon,
  GithubIcon,
  ExternalLinkIcon,
} from '@/components/shared/Icons';
import styles from './ResourceLibrary.module.css';

const CATEGORY_META: Record<
  ResourceCategory,
  { label: string; icon: ReactNode; tone: TileTone; action: string }
> = {
  'beginner-quantum': { label: 'Quantum Computing', icon: <BookIcon size={20} />, tone: 'blue', action: 'Start learning' },
  'qiskit-docs': { label: 'Qiskit', icon: <CodeIcon size={20} />, tone: 'violet', action: 'Documentation' },
  'ibm-quantum': { label: 'IBM Quantum', icon: <CloudIcon size={20} />, tone: 'cyan', action: 'Open platform' },
  tutorials: { label: 'Tutorials', icon: <FlaskIcon size={20} />, tone: 'green', action: 'View tutorial' },
  'workshop-materials': { label: 'Workshop Materials', icon: <FlaskIcon size={20} />, tone: 'violet', action: 'Open materials' },
  'github-repos': { label: 'GitHub', icon: <GithubIcon size={20} />, tone: 'blue', action: 'View repository' },
  challenge: { label: 'Challenges', icon: <TrophyIcon size={20} />, tone: 'amber', action: 'View challenge' },
  recordings: { label: 'Recordings', icon: <PlayIcon size={20} />, tone: 'pink', action: 'Watch' },
};

const CATEGORY_ORDER: ResourceCategory[] = [
  'beginner-quantum',
  'qiskit-docs',
  'ibm-quantum',
  'tutorials',
  'workshop-materials',
  'github-repos',
  'challenge',
  'recordings',
];

function ResourceCard({ resource }: { resource: Resource }) {
  const meta = CATEGORY_META[resource.category];

  // A resource without a URL isn't published yet — render it as a card so the
  // section still reads as complete, but never as a dead link.
  if (!resource.url) {
    return (
      <div className={`${styles.card} ${styles.cardPending}`}>
        <IconTile tone={meta.tone} size="sm">
          {meta.icon}
        </IconTile>
        <p className={styles.title}>{resource.title}</p>
        {resource.description && <p className={styles.description}>{resource.description}</p>}
        <p className={styles.pending}>Coming soon</p>
      </div>
    );
  }

  return (
    <a href={resource.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
      <IconTile tone={meta.tone} size="sm">
        {meta.icon}
      </IconTile>
      <p className={styles.title}>{resource.title}</p>
      {resource.description && <p className={styles.description}>{resource.description}</p>}
      <span className={styles.action}>
        {meta.action}
        <ExternalLinkIcon size={14} />
      </span>
    </a>
  );
}

export function ResourceLibrary({ resources }: { resources: Resource[] }) {
  const [filter, setFilter] = useState<ResourceCategory | 'all'>('all');

  const present = useMemo(
    () => CATEGORY_ORDER.filter((category) => resources.some((r) => r.category === category)),
    [resources],
  );

  const groups = useMemo(
    () =>
      present
        .filter((category) => filter === 'all' || category === filter)
        .map((category) => ({
          category,
          items: resources.filter((r) => r.category === category),
        }))
        .filter((group) => group.items.length > 0),
    [present, filter, resources],
  );

  if (resources.length === 0) {
    return <EmptyState message="Learning resources will be published soon." />;
  }

  return (
    <>
      <div className={styles.filters}>
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`${styles.pill} ${filter === 'all' ? styles.pillActive : ''}`}
        >
          All Resources
        </button>
        {present.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`${styles.pill} ${filter === category ? styles.pillActive : ''}`}
          >
            {CATEGORY_META[category].label}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <EmptyState message="No resources in this category yet." />
      ) : (
        groups.map((group) => (
          <section className={styles.group} key={group.category}>
            <div className={styles.groupHead}>
              <h2 className={styles.groupTitle}>{CATEGORY_META[group.category].label}</h2>
              <span className={styles.groupCount}>{group.items.length}</span>
            </div>
            <div className={styles.grid}>
              {group.items.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
