import { ArrowDownToLine, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { profile } from '../data/profile';

export function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
}

export function ResumeLink({ className = 'button secondary', label = 'Download resume' }: { className?: string; label?: string }) {
  return <a href={profile.resume} download className={className}><ArrowDownToLine size={16} />{label}</a>;
}

export function SocialLinks() {
  return <div className="social-links">
    <a className="icon-button" aria-label="GitHub profile" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={19} /></a>
    <a className="icon-button" aria-label="LinkedIn profile" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
  </div>;
}

export function RepositoryLink({ href }: { href: string }) {
  return <ExternalLink className="text-link" href={href}><Github size={16} /> GitHub <ArrowUpRight size={13} /></ExternalLink>;
}
