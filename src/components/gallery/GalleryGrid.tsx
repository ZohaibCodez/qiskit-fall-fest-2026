import type { GalleryCategory, GalleryPhoto } from '@/lib/types';
import { PlaceholderImage } from '@/components/shared/PlaceholderImage';
import styles from './GalleryGrid.module.css';

const CATEGORY_ORDER: GalleryCategory[] = [
  'opening', 'sessions', 'workshop', 'participants', 'networking', 'closing',
];

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const groups = new Map<GalleryCategory, GalleryPhoto[]>();
  for (const photo of photos) {
    if (!groups.has(photo.category)) groups.set(photo.category, []);
    groups.get(photo.category)!.push(photo);
  }

  return (
    <div>
      {CATEGORY_ORDER.filter((c) => groups.has(c)).map((category) => (
        <section className={styles.group} key={category}>
          <h3 className={styles.groupTitle}>{category}</h3>
          <div className={styles.grid}>
            {groups.get(category)!.map((photo) => (
              <div key={photo.id}>
                <PlaceholderImage
                  src={photo.status === 'available' ? photo.src : null}
                  alt={photo.caption ?? `${category} photo`}
                  fallbackLabel={category}
                />
                {photo.caption && <p className={styles.caption}>{photo.caption}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
