import type { Metadata } from 'next';
import { Hero } from '../components/hero';
import { About, Contact, Education, Experience, Projects, Resume, Skills } from '../components/sections';
import { profile } from '../data/profile';
import { siteOrigin } from '../lib/site';

const origin = siteOrigin();
export const metadata: Metadata = {
  alternates: origin ? { canonical: origin } : undefined,
};

export default function Home() {
  const person = {
    '@context': 'https://schema.org', '@type': 'Person', name: profile.name,
    jobTitle: profile.title, url: origin, sameAs: [profile.github, profile.linkedin],
    address: { '@type': 'PostalAddress', addressLocality: 'San Francisco', addressRegion: 'CA', addressCountry: 'US' },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, '\\u003c') }} />
    <Hero /><About /><Skills /><Projects /><Experience /><Education /><Resume /><Contact />
  </>;
}
