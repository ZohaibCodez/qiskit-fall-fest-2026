import type { Metadata } from 'next';
import { siteConfig } from './content';

/**
 * One place every page builds its <title>/description/OG/Twitter metadata
 * from, so the site-wide siteUrl/ogImage config only has to be threaded
 * through once. `path` is the route (e.g. "/about") used for the canonical
 * URL and absolute OG url — omitted entirely until seo.siteUrl is set.
 */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const { siteUrl, ogImage } = siteConfig.seo;
  const url = siteUrl ? new URL(path, siteUrl).toString() : undefined;
  const fullTitle = path === '/' ? title : `${title} — ${siteConfig.event.name}`;

  return {
    title: fullTitle,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.event.name,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: 'website',
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: fullTitle,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
