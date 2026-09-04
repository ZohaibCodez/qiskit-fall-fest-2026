'use client';

import { useState } from 'react';
import Link from 'next/link';
import { RegisterButton } from '@/components/shared/RegisterButton';
import styles from './NavBar.module.css';

const NAV_LINKS: Array<[string, string]> = [
  ['/about', 'About'],
  ['/schedule', 'Schedule'],
  ['/speakers', 'Speakers'],
  ['/activities', 'Activities'],
  ['/before-you-attend', 'Before You Attend'],
  ['/resources', 'Resources'],
  ['/team', 'Team'],
  ['/faq', 'FAQ'],
  ['/gallery', 'Gallery'],
  ['/contact', 'Contact'],
];

export function NavBar({ eventName }: { eventName: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          {eventName}
        </Link>

        <nav className={styles.desktopLinks} aria-label="Primary">
          {NAV_LINKS.map(([href, label]) => (
            <Link key={href} href={href} className={styles.link}>
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <RegisterButton />
          <button
            type="button"
            className={styles.toggle}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {open ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              ) : (
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className={`container ${styles.mobilePanel}`} aria-label="Primary (mobile)">
          {NAV_LINKS.map(([href, label]) => (
            <Link key={href} href={href} className={styles.link} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
