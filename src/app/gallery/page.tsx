import { gallery } from '@/lib/content';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { GalleryHighlights } from '@/components/gallery/GalleryHighlights';
import { EmptyState } from '@/components/shared/EmptyState';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'Gallery',
  'Photos and highlights from Qiskit Fall Fest 2026.',
  '/gallery',
);

export default function GalleryPage() {
  return (
    <div className="container page-wrap">
      <h1>Gallery &amp; Event Highlights</h1>
      <p>Photos from Qiskit Fall Fest 2026 — placeholders until real event photos are added.</p>
      {gallery.length === 0 ? (
        <EmptyState message="Photos coming soon." />
      ) : (
        <GalleryGrid photos={gallery} />
      )}
      <GalleryHighlights />
    </div>
  );
}
