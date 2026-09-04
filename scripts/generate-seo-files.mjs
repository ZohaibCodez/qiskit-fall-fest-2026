// Writes public/sitemap.xml and public/robots.txt from content/site.config.json.
// Runs before `next build` (see package.json). This exists instead of Next's
// app/sitemap.ts + app/robots.ts conventions because Next's metadata-route
// loader fails to compile when the project path contains an apostrophe
// (as in "D:\Friend's Project\"). Same output, path-safe.

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(readFileSync(join(root, 'content/site.config.json'), 'utf8'));
const siteUrl = config.seo?.siteUrl ?? null;

// /event-day is intentionally excluded — it's a live kiosk view, not indexable content.
const ROUTES = [
  '', '/about', '/schedule', '/speakers', '/activities', '/registration',
  '/before-you-attend', '/resources', '/team', '/faq', '/gallery', '/contact',
];

const lastmod = new Date().toISOString().slice(0, 10);

// No confirmed domain yet — an empty urlset is more honest than one pointing
// at a placeholder. Populates automatically once seo.siteUrl is set.
const urls = siteUrl
  ? ROUTES.map((route) => {
      const loc = new URL(route, siteUrl).toString();
      return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
    }).join('\n')
  : '';

writeFileSync(
  join(root, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);

const robots = ['User-agent: *', 'Allow: /'];
if (siteUrl) robots.push(`Sitemap: ${new URL('/sitemap.xml', siteUrl).toString()}`);
writeFileSync(join(root, 'public/robots.txt'), `${robots.join('\n')}\n`);

console.log(siteUrl ? `SEO files generated for ${siteUrl}` : 'SEO files generated (no seo.siteUrl set yet — sitemap is empty)');
