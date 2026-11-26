import Link from 'next/link';

export default function NotFound() {
  return <section className="frame section"><p className="eyebrow">404</p><h1>Page unavailable</h1><p>This portfolio page could not be found.</p><Link className="button primary" href="/#projects">Browse projects</Link></section>;
}
