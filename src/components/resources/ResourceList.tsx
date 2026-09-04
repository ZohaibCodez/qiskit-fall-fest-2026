import type { Resource, ResourceCategory } from '@/lib/types';
import { ExternalLink } from '@/components/shared/ExternalLink';
import styles from './ResourceList.module.css';

const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  'beginner-quantum': 'Beginner Quantum Resources',
  'qiskit-docs': 'Qiskit Learning & Documentation',
  'ibm-quantum': 'IBM Quantum Resources',
  tutorials: 'Tutorials & Hands-On Material',
  'workshop-materials': 'Workshop Notebooks & Slides',
  'github-repos': 'GitHub Repositories',
  challenge: 'Challenge Instructions & Solutions',
  recordings: 'Recordings & Post-Event Material',
};

export function ResourceList({ resources }: { resources: Resource[] }) {
  const groups = new Map<ResourceCategory, Resource[]>();
  for (const resource of resources) {
    if (!groups.has(resource.category)) groups.set(resource.category, []);
    groups.get(resource.category)!.push(resource);
  }

  return (
    <div>
      {Array.from(groups.entries()).map(([category, items]) => (
        <section className={styles.group} key={category}>
          <h3 className={styles.groupTitle}>{CATEGORY_LABELS[category]}</h3>
          <div className={styles.list}>
            {items.map((resource) => (
              <div className={styles.item} key={resource.id}>
                {resource.url ? (
                  <ExternalLink href={resource.url} className={styles.itemTitle}>
                    {resource.title}
                  </ExternalLink>
                ) : (
                  <span className={styles.itemTitle}>
                    {resource.title} <span className={styles.comingSoon}>(coming soon)</span>
                  </span>
                )}
                {resource.description && <p className={styles.description}>{resource.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
