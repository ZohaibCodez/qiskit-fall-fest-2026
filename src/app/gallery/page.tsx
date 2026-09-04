import type { Metadata } from 'next';
import { gallery } from '@/lib/content';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { GalleryHighlights } from '@/components/gallery/GalleryHighlights';

export const metadata: Metadata = { title: 'Gallery — Qiskit Fall Fest 2026' };

export default function GalleryPage() {
  return (
    <div className="container page-wrap">
      <h1>Gallery &amp; Event Highlights</h1>
      <p>Photos from Qiskit Fall Fest 2026 — placeholders until real event photos are added.</p>
      <GalleryGrid photos={gallery} />
      <GalleryHighlights />
    </div>
  );
}
