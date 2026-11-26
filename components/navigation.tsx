'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Command, Menu, Search, Sparkles, X } from 'lucide-react';
import { projects } from '../data/projects';
import { profile } from '../data/profile';
import { SocialLinks } from './links';
import { Assistant } from './assistant';

const sections = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact', 'Resume'];
const sectionLink = (label: string) => `/#${label.toLowerCase()}`;
const commands = [
  ...sections.map(label => ({ label, href: sectionLink(label), group: 'Section' })),
  ...projects.map(project => ({ label: project.name, href: `/projects/${project.slug}`, group: 'Case study' })),
  { label: 'Download resume', href: profile.resume, group: 'PDF', download: true },
  { label: 'Email Sai', href: `mailto:${profile.email}`, group: 'Contact' },
  { label: 'GitHub', href: profile.github, group: 'External link' },
  { label: 'LinkedIn', href: profile.linkedin, group: 'External link' },
  { label: 'Call Sai', href: 'tel:+15305925674', group: 'Contact' },
  { label: 'WhatsApp', href: profile.whatsapp, group: 'External link' },
  { label: 'Ask My AI', href: '', group: 'Assistant' },
];

export function Navigation() {
  const pathname = usePathname();
  const palette = useRef<HTMLDialogElement>(null);
  const assistant = useRef<HTMLDialogElement>(null);
  const queryField = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState('home');
  const [boot, setBoot] = useState(false);
  const filtered = commands.filter(command => `${command.label} ${command.group}`.toLowerCase().includes(query.toLowerCase().trim()));

  function openPalette() {
    if (assistant.current?.open || palette.current?.open) return;
    setQuery('');
    setSelected(0);
    palette.current?.showModal();
    queryField.current?.focus();
  }
  function openAssistant() {
    palette.current?.close();
    if (!assistant.current?.open) assistant.current?.showModal();
  }

  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (palette.current?.open) palette.current.close();
        else openPalette();
      }
      if (event.key === 'Escape') setMenu(false);
    }
    window.addEventListener('keydown', shortcut);
    return () => window.removeEventListener('keydown', shortcut);
  }, []);

  useEffect(() => {
    if (pathname !== '/' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {
      if (sessionStorage.getItem('portfolio-started')) return;
      sessionStorage.setItem('portfolio-started', 'yes');
      setBoot(true);
    } catch {
      // Storage is optional.
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') return;
    const targets = sections.map(label => document.getElementById(label.toLowerCase())).filter((node): node is HTMLElement => Boolean(node));
    function update() {
      let section = 'home';
      for (const target of targets) {
        if (target.getBoundingClientRect().top <= 150) section = target.id;
      }
      setActive(section);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  return <>
    <header className="site-header">
      <div className="frame nav-inner">
        <Link className="brand" href="/#home" onClick={() => setMenu(false)} aria-label="Sai Lakkakula home">
          <span className="brand-icon" aria-hidden="true">S</span><span>Sai Lakkakula</span>
        </Link>
        <nav className={menu ? 'main-nav is-open' : 'main-nav'} id="portfolio-nav" aria-label="Main navigation">
          {sections.map(label => {
            const current = pathname === '/' ? active === label.toLowerCase() : label === 'Projects';
            return <Link key={label} href={sectionLink(label)} onClick={() => setMenu(false)} aria-current={current ? 'location' : undefined}>{label}</Link>;
          })}
          <div className="mobile-social"><SocialLinks /></div>
        </nav>
        <div className="nav-tools">
          <button type="button" className="command-button" onClick={openPalette} aria-label="Open command palette"><Command size={14} /><span>K</span></button>
          <button type="button" className="icon-button menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="portfolio-nav" aria-label={menu ? 'Close navigation' : 'Open navigation'}>{menu ? <X /> : <Menu />}</button>
        </div>
      </div>
    </header>
    {boot && <span className="boot-status" aria-hidden="true" onAnimationEnd={() => setBoot(false)}>Initializing neural core</span>}
    <dialog ref={palette} className="dialog palette" aria-labelledby="command-title" onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}>
      <div className="dialog-body">
        <div className="dialog-top"><h2 id="command-title">Command palette</h2><button className="icon-button" aria-label="Close command palette" onClick={() => palette.current?.close()}><X size={20} /></button></div>
        <label className="search-field"><Search size={18} /><input ref={queryField} aria-label="Search commands" value={query} placeholder="Search pages, projects, or links" onChange={event => { setQuery(event.target.value); setSelected(0); }} onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setSelected(index => Math.max(0, Math.min(filtered.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1))));
          } else if (event.key === 'Enter') {
            palette.current?.querySelector<HTMLElement>(`[data-command="${selected}"]`)?.click();
          }
        }} /></label>
        <ul className="command-list">
          {filtered.map((command, index) => <li key={command.label}>
            {command.href ? <a className={index === selected ? 'selected-command' : ''} data-command={index} href={command.href}
              download={'download' in command ? true : undefined} target={command.href.startsWith('https:') ? '_blank' : undefined} rel="noopener noreferrer"
              onClick={() => { palette.current?.close(); setMenu(false); }}>{command.label}<small>{command.group}</small></a>
            : <button data-command={index} onClick={openAssistant} className={index === selected ? 'selected-command' : ''}>{command.label}<small>{command.group}</small></button>}
          </li>)}
        </ul>
        {!filtered.length && <p className="muted">No matching commands.</p>}
      </div>
    </dialog>
    <button className="assistant-launch" type="button" onClick={openAssistant}><Sparkles size={17} /> Ask My AI <ArrowUpRight size={14} /></button>
    <Assistant dialog={assistant} />
  </>;
}
