import { education, experience, profile, skills } from '../data/profile.ts';
import { projects } from '../data/projects.ts';

export interface Evidence {
  id: string;
  title: string;
  href: string;
  text: string;
  keywords?: string;
}

const evidence: Evidence[] = [
  { id: 'profile', title: 'AI/ML experience', href: '/#about', text: profile.summary, keywords: 'profile about background experience professional years engineer' },
  { id: 'contact', title: 'Contact', href: '/#contact', text: `Email Sai at ${profile.email} or call ${profile.phone}. GitHub, LinkedIn and WhatsApp links are on the contact page.`, keywords: 'reach contact email phone linkedin github whatsapp' },
  { id: 'education', title: 'Education', href: '/#education', text: education.map(item => `${item.degree}, ${item.school} (${item.date}).`).join(' '), keywords: 'college university degree education studied academic' },
  { id: 'resume', title: 'Resume', href: '/#resume', text: 'The original resume PDF is available to preview, open or download.', keywords: 'pdf resume download cv' },
  ...experience.flatMap((job, index) => job.details.map((detail, part) => ({
    id: `job-${index}-${part}`, title: `${job.role} · ${job.company}`, href: '/#experience',
    text: `${job.company} (${job.dates}). ${detail}`,
    keywords: `${job.company} ${job.role} professional experience work`,
  }))),
  ...skills.map((group, index) => ({
    id: `skills-${index}`, title: group.name, href: '/#skills',
    text: `${group.description} Skills include ${group.items.join(', ')}.`, keywords: 'skills tools technologies',
  })),
  ...projects.flatMap(project => {
    const href = `/projects/${project.slug}`;
    const overview: Evidence = { id: project.slug, title: project.name, href, text: project.description, keywords: `${project.name} overview project` };
    return [overview,
      { ...overview, id: `${project.slug}-architecture`, text: `System flow: ${project.architecture.map(layer => layer.join(' + ')).join(' → ')}. Stack: ${project.technologies.join(', ')}.`, keywords: `${project.name} architecture backend stack` },
      ...project.sections.flatMap((section, index) => section.paragraphs.map((text, part) => ({
        ...overview, id: `${project.slug}-${index}-${part}`, text, keywords: `${project.name} ${section.title}`,
      }))),
    ];
  }),
];

const stop = new Set('a an and are as at be by can did do does for from had has have how i in is it me my of on or sai tell that the their them there this to use was were what when where which who with would you your'.split(' '));
const unrelatedInstruction = /(?:ignore|override|forget)\b.{0,55}\b(?:instructions|rules|prompt)|\b(?:system prompt|api key|developer message|credentials)\b/i;
const words = (text: string) => (text.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter(word => word.length > 1 && !stop.has(word));

export function retrieve(question: string, limit = 7): Evidence[] {
  if (unrelatedInstruction.test(question)) return [];
  const query = [...new Set(words(question))];
  if (!query.length) return [];
  const lower = question.toLowerCase();
  const namedProject = projects.find(project => lower.includes(project.name.toLowerCase()) || lower.includes(project.slug));
  const ranked = evidence
    .filter(item => !namedProject || item.href === `/projects/${namedProject.slug}`)
    .map(item => {
      const title = new Set(words(`${item.title} ${item.keywords ?? ''}`));
      const body = new Set(words(item.text));
      const score = query.reduce((value, word) => value + (title.has(word) ? 4 : 0) + (body.has(word) ? 2 : 0), 0);
      const overview = namedProject && item.id === namedProject.slug && query.length <= 2 ? 15 : 0;
      return { item, score: score + overview };
    })
    .filter(result => result.score >= 2)
    .sort((a, b) => b.score - a.score);
  return ranked.slice(0, limit).map(result => result.item);
}

export function localAnswer(matches: Evidence[]) {
  const chosen = matches.slice(0, matches.length > 1 && matches[0].href === matches[1].href ? 2 : 1);
  return formatAnswer(chosen, 'search');
}

export function formatAnswer(items: Evidence[], mode: 'ai' | 'search') {
  const links = [...new Map(items.map(item => [item.href, { href: item.href, label: item.title }])).values()];
  return {
    mode,
    answer: items.map(item => item.text).join('\n\n') || 'I couldn’t find that in Sai’s portfolio. Try asking about a project, professional experience, skills, education, or contact details.',
    links,
  };
}
