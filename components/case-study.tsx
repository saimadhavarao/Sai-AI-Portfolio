import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { RepositoryLink } from './links';
import { ProjectArt } from './project-art';

const positions = (count: number) => Array.from({ length: count }, (_, index) => 100 * (index + 1) / (count + 1));

function Architecture({ project }: { project: Project }) {
  const layers = project.architecture;
  const width = 600;
  const height = 76 * layers.length;
  return <figure className="architecture">
    <div className="architecture-flow">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
        {layers.slice(0, -1).map((layer, index) => positions(layer.length).flatMap((start, node) => positions(layers[index + 1].length).map((end, next) => {
          const x1 = start * 6;
          const x2 = end * 6;
          const y = index * 76 + 38;
          return <path key={`${index}-${node}-${next}`} d={`M ${x1} ${y} C ${x1} ${y + 49}, ${x2} ${y + 27}, ${x2} ${y + 76}`} fill="none" stroke="currentColor" strokeDasharray="4 4" />;
        })))}
      </svg>
      <ol aria-label="Architecture stages">{layers.map((layer, index) => <li key={layer.join('/')} className="architecture-layer">
        {layer.map((node, n) => <span key={node} style={{ '--position': `${positions(layer.length)[n]}%` } as CSSProperties}>{node}</span>)}
        {index !== layers.length - 1 && <ArrowDown size={16} className="mobile-flow-arrow" aria-hidden="true" />}
      </li>)}</ol>
    </div>
    <figcaption>{layers.map(layer => layer.join(' and ')).join(' → ')}.</figcaption>
  </figure>;
}

function Benchmarks({ project }: { project: Project }) {
  if (project.slug === 'realtime-chess') {
    return <section className="case-block"><h2>Polling and WebSocket event flow</h2><div className="comparison-grid">
      <article><h3>Traditional polling</h3><p>Repeated client-server requests, including periods with no moves.</p><div className="signal-flow polling-flow" aria-hidden="true"><span>Client</span><i /><span>Server</span></div></article>
      <article><h3>WebSocket communication</h3><p>A persistent connection broadcasts game updates when moves occur.</p><div className="signal-flow socket-flow" aria-hidden="true"><span>Player A</span><i /><span>Player B</span></div></article>
    </div></section>;
  }
  if (!['friday', 'multi-layer-perceptron'].includes(project.slug)) return null;
  const friday = project.slug === 'friday';
  const values = friday
    ? [{ label: 'Version 1', value: 66.7, detail: '48 / 72' }, { label: 'Version 2', value: 100, detail: '72 / 72' }]
    : [{ label: 'Baseline MLP', value: 35, detail: '' }, { label: 'Optimized MLP', value: 52, detail: '' }];
  return <section className="case-block">
    <h2>{friday ? 'Grounding regression results' : 'Custom handwriting accuracy'}</h2>
    <p>{friday ? 'Paired synthetic suite with a deterministic mock provider. Counts include grounded answers and correct abstentions.' : 'Academic submission results. The public notebook shows several custom-data runs and does not independently reproduce this exact pair.'}</p>
    <div className="benchmark-chart">{values.map(({ label, value, detail }) => <div key={label}>
      <div><span>{label}</span><strong>{value}% {detail && <small>({detail})</small>}</strong></div>
      <div className="chart-track" aria-hidden="true"><span style={{ width: `${value}%` }} /></div>
    </div>)}</div>
    <p className="benchmark-change">{friday ? '+33.3 percentage points' : '+17 percentage points · +48.6% relative'}</p>
  </section>;
}

export function CaseStudy({ project }: { project: Project }) {
  const index = projects.findIndex(item => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index + projects.length - 1) % projects.length];
  return <div className="case-page" style={{ '--accent': project.accent } as CSSProperties}>
    <header className="case-hero">
      <div className="frame">
        <Link className="text-link case-back" href="/#projects"><ArrowLeft size={16} /> All projects</Link>
        <div className="case-intro">
          <div><p className="eyebrow">{project.category} · {project.year}</p><h1>{project.name}</h1><p className="case-subtitle">{project.subtitle}</p>
            <p className="case-description">{project.description}</p>
            <RepositoryLink href={project.github} />
          </div>
          <ProjectArt project={project} />
        </div>
        <ul className="tags" aria-label="Technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
      </div>
    </header>
    <div className="frame case-content">
      {project.metrics.length > 0 && <dl className="case-metrics">{project.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>}
      <div className="case-pair">
        <section className="case-block"><h2>Problem</h2><p>{project.problem}</p></section>
        <section className="case-block"><h2>Objective</h2><p>{project.objective}</p></section>
      </div>
      <section className="case-block"><h2>System architecture</h2><Architecture project={project} /></section>
      <Benchmarks project={project} />
      {project.sections.map(section => <section key={section.title} className="case-block">
        <h2>{section.title}</h2>
        {section.paragraphs.length === 1 ? <p>{section.paragraphs[0]}</p> : <ul>{section.paragraphs.map(paragraph => <li key={paragraph}>{paragraph}</li>)}</ul>}
      </section>)}
      <nav className="case-pagination" aria-label="Other case studies">
        <Link className="text-link" href={`/projects/${previous.slug}`}><ArrowLeft size={16} />{previous.name}</Link>
        <Link className="text-link" href={`/projects/${next.slug}`}>{next.name}<ArrowRight size={16} /></Link>
      </nav>
    </div>
  </div>;
}
