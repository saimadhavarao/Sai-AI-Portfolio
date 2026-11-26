import type { Project } from '../data/projects';

export function ProjectArt({ project }: { project: Project }) {
  const common = { stroke: 'currentColor', fill: 'none', strokeWidth: 1.4 };
  const nodes = (coords: number[][]) => coords.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="currentColor" />);
  const artwork: Record<string, React.ReactNode> = {
    friday: <g {...common}>
      <circle cx="180" cy="100" r="56" opacity=".22" strokeDasharray="2 5" />
      <circle cx="180" cy="100" r="42" opacity=".54" />
      <path d="M180 76l21 12v24l-21 12-21-12V88zM76 55h47l31 25m130-25h-47l-31 25M76 145h47l31-25m130 25h-47l-31-25" />
      {nodes([[76,55],[284,55],[76,145],[284,145],[180,100]])}
      <path d="M58 44h36v22H58zm208 0h36v22h-36zM58 134h36v22H58zm208 0h36v22h-36z" opacity=".44" />
    </g>,
    agenttrace: <g {...common}>
      <path d="M57 134h246M57 97h246M57 60h246" opacity=".22" strokeDasharray="4 5" />
      <path d="M58 121h42l22-22h38l29-52 28 84 27-39h58" strokeWidth="2" />
      <circle cx="189" cy="47" r="14" opacity=".45" />
      <circle cx="217" cy="131" r="12" opacity=".45" />
      {nodes([[58,121],[122,99],[189,47],[217,131],[244,92],[302,92]])}
    </g>,
    jarvis: <g {...common}>
      <rect x="91" y="39" width="99" height="123" rx="8" opacity=".35" />
      <rect x="104" y="31" width="99" height="123" rx="8" fill="#0d1c1b" />
      <path d="M126 59h52m-52 20h52m-52 20h35m-35 20h25" opacity=".7" />
      <circle cx="221" cy="116" r="37" fill="#112723" />
      <path d="M221 94v22l15 9M170 145l21-9" strokeWidth="2" />
      {nodes([[221,116]])}
    </g>,
    escalationiq: <g {...common}>
      <path d="M68 35v125h232M68 66h232" opacity=".45" strokeDasharray="4 4" />
      <path d="M72 145l49-9 40 5 35-29 28 5 33-49 41-18v110H72z" fill="currentColor" fillOpacity=".12" stroke="none" />
      <path d="M72 145l49-9 40 5 35-29 28 5 33-49 41-18" strokeWidth="2" />
      {nodes([[72,145],[121,136],[161,141],[196,112],[224,117],[257,68],[298,50]])}
    </g>,
    'multi-layer-perceptron': <g {...common}>
      {[55,85,115,145].flatMap(y => [43,71,100,129,157].map(z => <path key={`a${y}-${z}`} d={`M90 ${y}L180 ${z}`} opacity=".22" />))}
      {[43,71,100,129,157].flatMap(y => [66,100,134].map(z => <path key={`b${y}-${z}`} d={`M180 ${y}L270 ${z}`} opacity=".24" />))}
      {nodes([[90,55],[90,85],[90,115],[90,145],[180,43],[180,71],[180,100],[180,129],[180,157],[270,66],[270,100],[270,134]])}
    </g>,
    'realtime-chess': <g {...common}>
      <rect x="124" y="44" width="112" height="112" rx="3" />
      {Array.from({ length: 64 }, (_, i) => ((i + Math.floor(i / 8)) % 2 === 0) && <rect key={i} x={124 + (i % 8) * 14} y={44 + Math.floor(i / 8) * 14} width="14" height="14" fill="currentColor" opacity=".16" stroke="none" />)}
      <path d="M171 125h34m-30-5 4-19 5-11-4-4 8-11 11 15 2 26m-124-16h37m132 0h37" strokeWidth="2" />
      {nodes([[78,100],[282,100]])}
      <circle cx="78" cy="100" r="12" opacity=".45" /><circle cx="282" cy="100" r="12" opacity=".45" />
    </g>,
  };

  return <figure className="project-art">
    <svg viewBox="0 0 360 200" role="img" aria-label={`Conceptual system visualization for ${project.name}`}>{artwork[project.slug]}</svg>
    <figcaption>Conceptual system visualization</figcaption>
  </figure>;
}
