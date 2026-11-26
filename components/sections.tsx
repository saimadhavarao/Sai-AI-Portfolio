import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { ArrowDownToLine, ArrowRight, ArrowUpRight, ChevronDown, Github, GraduationCap, Linkedin, Mail, MessageCircle, Phone } from 'lucide-react';
import { education, experience, profile } from '../data/profile';
import { projects } from '../data/projects';
import { ExternalLink, RepositoryLink, ResumeLink } from './links';
import { ProjectArt } from './project-art';
import { SkillExplorer } from './skills';
import { CopyEmail } from './copy-email';

export function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return <header className="section-heading"><p className="eyebrow">{label}</p><h2>{title}</h2>{description && <p>{description}</p>}</header>;
}

export function About() {
  const highlights = [
    ['4+ years', 'AI/ML engineering experience'],
    ['3M+', 'Enterprise records transformed at C3.ai'],
    ['42%', 'Less enterprise document search time at C3.ai'],
  ];
  return <section id="about" className="frame section about-section">
    <div className="about-intro"><SectionHeading label="ABOUT" title="From data to production." /><p>{profile.summary}</p></div>
    <div className="highlights">{highlights.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
  </section>;
}

export function Skills() {
  return <section id="skills" className="frame section">
    <SectionHeading label="TECHNICAL SKILLS" title="My engineering stack" />
    <SkillExplorer />
  </section>;
}

export function Projects() {
  return <section id="projects" className="frame section">
    <div className="heading-row"><SectionHeading label="SELECTED WORK" title="Six engineering projects" /><p>Agent workflows, applied machine learning, and real-time systems.</p></div>
    <div className="project-grid">{projects.map((project, index) => <article key={project.slug} className={`project-card ${project.flagship ? 'flagship' : ''}`} style={{ '--accent': project.accent } as CSSProperties}>
      <ProjectArt project={project} />
      <div className="card-content">
        <div className="card-meta"><span>{String(index + 1).padStart(2, '0')} / {project.year}</span>{project.flagship && <span className="flagship-label">Flagship</span>}</div>
        <p className="card-category">{project.category}</p><h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3>
        <p className="card-subtitle">{project.subtitle}</p><p className="card-description">{project.description}</p>
        <ul className="tags" aria-label="Technologies">{project.technologies.map(tech => <li key={tech}>{tech}</li>)}</ul>
        <div className="card-actions"><Link className="text-link accent-link" href={`/projects/${project.slug}`}>Case study <ArrowRight size={15} /></Link><RepositoryLink href={project.github} /></div>
      </div>
    </article>)}</div>
  </section>;
}

export function Experience() {
  return <section id="experience" className="frame section">
    <SectionHeading label="EXPERIENCE" title="Professional experience" />
    <div className="timeline">{experience.map((item, index) => <article key={item.company} className="timeline-item">
      <p className="timeline-date">{item.dates}<span>{item.location}</span></p>
      <div className="timeline-content">
        <h3>{item.role}</h3><p className="company">{item.company}</p>
        <p>{item.details[0]}</p>
        <details open={index === 0 ? true : undefined}>
          <summary>Responsibilities and outcomes <ChevronDown size={17} /></summary>
          <ul>{item.details.slice(1).map(detail => <li key={detail}>{detail}</li>)}</ul>
        </details>
      </div>
    </article>)}</div>
  </section>;
}

export function Education() {
  return <section id="education" className="frame section">
    <SectionHeading label="EDUCATION" title="Academic background" />
    <div className="education-grid">{education.map(item => <article key={item.school}><GraduationCap size={26} aria-hidden="true" /><p className="eyebrow">{item.date} · {item.location}</p><h3>{item.degree}</h3><p>{item.school}</p></article>)}</div>
  </section>;
}

export function Resume() {
  return <section id="resume" className="frame section">
    <div className="resume-panel">
      <SectionHeading label="RESUME" title="Experience at a glance" description="Download the original resume or open the PDF in a new tab." />
      <div className="resume-actions"><ResumeLink label="Download PDF" className="button primary" /><ExternalLink href={profile.resume} className="button secondary">Open PDF <ArrowUpRight size={16} /></ExternalLink></div>
      <details className="resume-preview"><summary>Preview resume <ChevronDown size={17} /></summary><a className="resume-image" href={profile.resume} target="_blank" rel="noopener noreferrer" aria-label="Open the full resume PDF"><Image src="/resume-preview.png" width={600} height={1050} alt="First page of the resume. Open the PDF for selectable text." sizes="(max-width: 650px) 100vw, 550px" /></a></details>
    </div>
  </section>;
}

export function Contact() {
  return <section id="contact" className="frame section contact-section">
    <SectionHeading label="CONTACT" title="Let’s talk." description="Reach me by email or connect on GitHub and LinkedIn." />
    <div className="contact-grid">
      <div className="contact-email"><a href={`mailto:${profile.email}`}><Mail size={20} /><span><small>Email</small>{profile.email}</span></a><CopyEmail /></div>
      <ExternalLink href={profile.github}><Github size={20} /><span><small>GitHub</small>@saimadhavarao</span></ExternalLink>
      <ExternalLink href={profile.linkedin}><Linkedin size={20} /><span><small>LinkedIn</small>Sai Madhava Rao Lakkakula</span></ExternalLink>
      <a href="tel:+15305925674"><Phone size={20} /><span><small>Phone</small>{profile.phone}</span></a>
      <ExternalLink href={profile.whatsapp}><MessageCircle size={20} /><span><small>WhatsApp</small>Send a message</span></ExternalLink>
      <a href={profile.resume} download><ArrowDownToLine size={20} /><span><small>Resume</small>Download PDF</span></a>
    </div>
  </section>;
}

export function Footer() {
  return <footer className="site-footer"><div className="frame"><span>© 2026 Sai Madhava Rao Lakkakula</span><Link href="/#home">Back to top ↑</Link></div></footer>;
}
