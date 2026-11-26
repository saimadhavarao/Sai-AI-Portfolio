'use client';

import { useEffect, useRef, useState } from 'react';

export function Core() {
  const stage = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const target = stage.current;
    if (!target) return;
    const media = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference) and (pointer: fine)');
    let cleanup: (() => void) | undefined;
    let version = 0;

    async function configure() {
      const current = ++version;
      cleanup?.();
      cleanup = undefined;
      setReady(false);
      if (!target || !media.matches) return;
      try {
        const { mountCore } = await import('./core-scene');
        if (current !== version) return;
        cleanup = mountCore(target, setReady);
      } catch {
        // The static schematic stays visible when WebGL cannot initialize.
      }
    }

    const job = window.setTimeout(configure, 100);
    media.addEventListener('change', configure);
    return () => {
      version++;
      window.clearTimeout(job);
      cleanup?.();
      media.removeEventListener('change', configure);
    };
  }, []);

  return (
    <div className="core-instrument" role="img" aria-label="AI core visualization with orbital rings and a neural network sphere">
      <div className="core-grid" aria-hidden="true" />
      <svg className="core-orbits" viewBox="0 0 520 520" aria-hidden="true">
        <defs>
          <radialGradient id="core-light">
            <stop stopColor="#36c9f0" stopOpacity=".22" />
            <stop offset="1" stopColor="#36c9f0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="core-stroke" x2="1" y2="1">
            <stop stopColor="#a4efff" /><stop offset="1" stopColor="#1a7599" />
          </linearGradient>
        </defs>
        <circle cx="260" cy="260" r="247" fill="url(#core-light)" />
        <g transform="translate(260 260)" fill="none">
          <circle r="222" stroke="#53cde8" strokeOpacity=".24" strokeDasharray="1 6" />
          <circle r="204" stroke="#53cde8" strokeOpacity=".22" />
          <circle r="185" stroke="#53cde8" strokeOpacity=".16" />
          <circle r="157" stroke="#53cde8" strokeOpacity=".36" strokeDasharray="3 7" />
          <path className="orbit-rotate" d="M-195-61A204 204 0 0 1 26-202M188 80A204 204 0 0 1 44 199" stroke="#80e8ff" strokeWidth="2" strokeLinecap="round" />
          <path className="orbit-reverse" d="M-146 56A157 157 0 0 1-113-109M128-91A157 157 0 0 1 155 26" stroke="#3bccf1" strokeWidth="3" />
          <path d="M-235 0h38M197 0h38M0-235v38M0 197v38" stroke="#79d9f0" strokeOpacity=".55" />
          <g opacity={ready ? 0 : 1} className="core-static">
            <circle r="105" stroke="url(#core-stroke)" />
            <ellipse rx="105" ry="46" transform="rotate(-23)" stroke="#56dcf2" strokeOpacity=".65" />
            <ellipse rx="48" ry="105" transform="rotate(-23)" stroke="#56dcf2" strokeOpacity=".65" />
            <path d="M0-101 89-50 89 50 0 101-89 50-89-50ZM0-101 42-25 0 50-42-25ZM89-50 42-25 89 50 0 50 0 101-89 50-42-25-89-50 42-25 0 50-42-25" stroke="#90e9ff" strokeOpacity=".62" />
            {[[0,-101],[89,-50],[89,50],[0,101],[-89,50],[-89,-50],[42,-25],[-42,-25],[0,50]].map(([x,y]) => <circle key={`${x},${y}`} cx={x} cy={y} r="3.5" fill="#bcf6ff" />)}
          </g>
        </g>
      </svg>
      <div ref={stage} className="core-webgl" aria-hidden="true" />
      <span className="core-label" aria-hidden="true"><i /> NEURAL CORE</span>
    </div>
  );
}
