import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudy } from '../../../components/case-study';
import { projects } from '../../../data/projects';
import { siteOrigin } from '../../../lib/site';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return {};
  const origin = siteOrigin();
  const url = origin ? `${origin}/projects/${slug}` : undefined;
  return {
    title: project.name, description: project.description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: { title: project.name, description: project.description, url, images: ['/social-preview.png'], type: 'article' },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const origin = siteOrigin();
  const schema = {
    '@context': 'https://schema.org', '@type': 'SoftwareSourceCode', name: project.name,
    description: project.description, codeRepository: project.github,
    url: origin ? `${origin}/projects/${slug}` : undefined,
    author: { '@type': 'Person', name: 'Sai Madhava Rao Lakkakula' },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <CaseStudy project={project} />
  </>;
}
