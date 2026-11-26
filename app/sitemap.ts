import type { MetadataRoute } from 'next';
import { projects } from '../data/projects';
import { siteOrigin } from '../lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  return origin ? [{ url: origin }, ...projects.map(project => ({ url: `${origin}/projects/${project.slug}` }))] : [];
}
