import AboutIntro from '@content/pages/about-intro.mdx';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata(
  'About',
  'What Qiskit Fall Fest is, a beginner-friendly introduction to quantum computing, and this year’s theme: A Decade of Quantum on the Cloud.',
  '/about',
);

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '48px 0', maxWidth: 760 }}>
      <h1>About Qiskit Fall Fest 2026</h1>
      <AboutIntro />
    </div>
  );
}
