import type { Metadata } from 'next';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import './globals.css';
import { Navigation } from '../components/navigation';
import { Footer } from '../components/sections';
import { profile } from '../data/profile';
import { siteOrigin } from '../lib/site';

const origin = siteOrigin();
const description = 'AI/ML engineer building predictive models, retrieval systems, agent workflows and production ML infrastructure. Explore six engineering case studies.';

export const metadata: Metadata = {
  title: { default: `${profile.name} | AI/ML Engineer`, template: '%s | Sai Madhava Rao Lakkakula' },
  description,
  metadataBase: origin ? new URL(origin) : undefined,
  icons: '/icon.svg',
  openGraph: { title: `${profile.name} | AI/ML Engineer`, description, type: 'website', images: ['/social-preview.png'], url: origin },
  twitter: { card: 'summary_large_image', images: ['/social-preview.png'] },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Navigation />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
