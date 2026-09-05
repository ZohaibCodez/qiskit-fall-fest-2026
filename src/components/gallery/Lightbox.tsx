'use client';

import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { GalleryPhoto } from '@/lib/types';
import styles from './Lightbox.module.css';

/**
 * Accessible image lightbox: modal dialog semantics, Escape to close,
 * arrow-key navigation, backdrop click to dismiss, focus moved in on open
 * and restored on close, and page scroll locked while open (§50).
 */
export function Lightbox({
  photos,
  index,
  onClose,
  onNavigate,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const photo = photos[index];

  const goPrev = useCallback(
    () => onNavigate((index - 1 + photos.length) % photos.length),
    [index, photos.length, onNavigate],
  );
  const goNext = useCallback(() => onNavigate((index + 1) % photos.length), [index, photos.length, onNavigate]);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement;
    dialogRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [onClose, goPrev, goNext]);

  if (!photo?.src) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption ?? `${photo.category} photo`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.dialog} ref={dialogRef} tabIndex={-1}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </button>

        {photos.length > 1 && (
          <>
            <button type="button" className={`${styles.control} ${styles.prev}`} onClick={goPrev} aria-label="Previous photo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m14.5 6-6 6 6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button type="button" className={`${styles.control} ${styles.next}`} onClick={goNext} aria-label="Next photo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m9.5 6 6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        <figure className={styles.figure}>
          <Image
            src={photo.src}
            alt={photo.caption ?? `${photo.category} photo`}
            width={1400}
            height={933}
            className={styles.image}
          />
          {photo.caption && <figcaption className={styles.caption}>{photo.caption}</figcaption>}
        </figure>

        <p className={styles.counter}>
          {index + 1} / {photos.length}
        </p>
      </div>
    </div>
  );
}
