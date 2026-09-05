'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import type { GalleryCategory, GalleryPhoto } from '@/lib/types';
import { ImageIcon } from '@/components/shared/Icons';
import { Lightbox } from './Lightbox';
import styles from './GalleryGrid.module.css';

const CATEGORY_ORDER: GalleryCategory[] = [
  'opening',
  'sessions',
  'workshop',
  'participants',
  'networking',
  'closing',
];

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  // The lightbox only ever navigates real photos, so placeholders can't be opened.
  const available = useMemo(
    () => photos.filter((photo) => photo.status === 'available' && photo.src),
    [photos],
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const groups = useMemo(
    () =>
      CATEGORY_ORDER.map((category) => ({
        category,
        items: photos.filter((photo) => photo.category === category),
      })).filter((group) => group.items.length > 0),
    [photos],
  );

  return (
    <div>
      {groups.map((group) => (
        <section className={styles.group} key={group.category}>
          <div className={styles.groupHead}>
            <h2 className={styles.groupTitle}>{group.category}</h2>
            <span className={styles.groupCount}>{group.items.length}</span>
          </div>

          <div className={styles.grid}>
            {group.items.map((photo) => {
              const isAvailable = photo.status === 'available' && photo.src;
              if (!isAvailable) {
                return (
                  <div className={`${styles.tile} ${styles.tileEmpty}`} key={photo.id}>
                    <ImageIcon size={26} />
                    <span className={styles.emptyLabel}>{group.category}</span>
                  </div>
                );
              }

              const lightboxIndex = available.findIndex((item) => item.id === photo.id);
              return (
                <button
                  type="button"
                  className={styles.tile}
                  key={photo.id}
                  onClick={() => setOpenIndex(lightboxIndex)}
                  aria-label={`Open photo: ${photo.caption ?? group.category}`}
                >
                  <Image
                    src={photo.src as string}
                    alt={photo.caption ?? `${group.category} photo`}
                    fill
                    className={styles.image}
                    sizes="(max-width: 720px) 100vw, 300px"
                  />
                  {photo.caption && (
                    <span className={styles.overlay}>
                      <span className={styles.caption}>{photo.caption}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      ))}

      {openIndex !== null && (
        <Lightbox
          photos={available}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
