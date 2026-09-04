import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '64px 0', textAlign: 'center' }}>
      <h1>Page not found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
