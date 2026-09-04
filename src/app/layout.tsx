import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import { EventPhaseProvider } from '@/lib/eventPhase';
import { siteConfig } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { NavBar } from '@/components/layout/NavBar';
import { Footer } from '@/components/layout/Footer';
import { PhaseBanner } from '@/components/layout/PhaseBanner';
import './globals.css';

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  ...pageMetadata(siteConfig.event.name, siteConfig.event.description, '/'),
  metadataBase: siteConfig.seo.siteUrl ? new URL(siteConfig.seo.siteUrl) : undefined,
  // Declared here rather than via app/icon.svg: Next's metadata-route loader
  // fails to compile when the project path contains an apostrophe.
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body>
        <EventPhaseProvider config={siteConfig}>
          <a href="#main-content" className="visually-hidden">
            Skip to main content
          </a>
          <PhaseBanner />
          <NavBar eventName={siteConfig.event.name} />
          <main id="main-content">{children}</main>
          <Footer />
        </EventPhaseProvider>
      </body>
    </html>
  );
}
