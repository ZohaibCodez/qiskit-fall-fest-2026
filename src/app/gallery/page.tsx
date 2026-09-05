import { gallery } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { PageHero } from '@/components/shared/PageHero';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { GalleryHighlights } from '@/components/gallery/GalleryHighlights';
import { EmptyState } from '@/components/shared/EmptyState';

export const metadata = pageMetadata(
  'Gallery',
  'Photos and highlights from Qiskit Fall Fest 2026.',
  '/gallery',
);

export default function GalleryPage() {
  const hasPhotos = gallery.some((photo) => photo.status === 'available' && photo.src);

  return (
    <>
      <PageHero
        eyebrow="Event Photos"
        title="Moments from"
        titleAccent="the event."
        lede={
          hasPhotos
            ? 'A look back at the talks, workshops and people that made the event.'
            : 'Photos from Qiskit Fall Fest 2026 will appear here once the event has taken place.'
        }
      />

      <div className="container page-wrap">
        {gallery.length === 0 ? (
          <EmptyState message="Event photos will be added after the event." />
        ) : (
          <GalleryGrid photos={gallery} />
        )}
        <GalleryHighlights />
      </div>
    </>
  );
}
