'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RegisterButton } from '@/components/shared/RegisterButton';
import styles from './NavBar.module.css';

const NAV_LINKS: Array<[string, string]> = [
  ['/', 'Home'],
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

function BrandMark() {
  return (
    <svg className={styles.brandMark} width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14.2" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <ellipse cx="16" cy="16" rx="14" ry="5.6" stroke="currentColor" strokeWidth="1.4" transform="rotate(-28 16 16)" />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
    </svg>
  );
}

export function NavBar({ eventName }: { eventName: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const renderLink = (href: string, label: string, onClick?: () => void) => (
    <Link
      key={href}
      href={href}
      onClick={onClick}
      aria-current={isActive(href) ? 'page' : undefined}
      className={`${styles.link} ${isActive(href) ? styles.active : ''}`}
    >
      {label}
    </Link>
  );

  return (
    <header className={styles.bar}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <BrandMark />
          <span className={styles.brandText}>
            Qiskit
            <span className={styles.brandSub}>{eventName.replace(/^Qiskit\s+/, '')}</span>
          </span>
        </Link>

        <nav className={styles.desktopLinks} aria-label="Primary">
          {NAV_LINKS.map(([href, label]) => renderLink(href, label))}
        </nav>

        <div className={styles.actions}>
          <RegisterButton onDark compact className={styles.registerCta} />
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
          {NAV_LINKS.map(([href, label]) => renderLink(href, label, () => setOpen(false)))}
        </nav>
      )}
    </header>
  );
}
