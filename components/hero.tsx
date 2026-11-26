import { ArrowDown, ArrowRight, MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import { Core } from './core';
import { ResumeLink, SocialLinks } from './links';

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-inner frame">
        <div className="hero-copy">
          <p className="eyebrow hero-role"><span /> AI / ML ENGINEER</p>
          <h1 id="hero-title">Sai Madhava Rao <strong>Lakkakula</strong></h1>
          <p className="hero-description">I build predictive models, retrieval systems, and AI agents, then engineer the services that run them.</p>
          <div className="hero-actions">
            <a href="#projects" className="button primary">Explore my work <ArrowRight size={17} /></a>
            <ResumeLink />
            <a href="#contact" className="text-link hero-contact">Contact me</a>
          </div>
          <div className="hero-meta"><span><MapPin size={15} /> {profile.location}</span><SocialLinks /></div>
        </div>
        <Core />
      </div>
      <div className="frame hero-bottom">
        <a href="#about"><ArrowDown size={14} /> About me</a>
        <span>Machine Learning <i /> Generative AI <i /> MLOps</span>
      </div>
    </section>
  );
}
