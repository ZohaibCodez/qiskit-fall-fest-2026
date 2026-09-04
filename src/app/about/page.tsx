import type { Metadata } from 'next';
import AboutIntro from '@content/pages/about-intro.mdx';

export const metadata: Metadata = { title: 'About — Qiskit Fall Fest 2026' };

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '48px 0', maxWidth: 760 }}>
      <h1>About Qiskit Fall Fest 2026</h1>
      <AboutIntro />
    </div>
  );
}
