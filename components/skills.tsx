'use client';

import { useState } from 'react';
import { Network } from 'lucide-react';
import { skills } from '../data/profile';

const descriptions: Record<string, string> = {
  PyTorch: 'Used to develop and evaluate predictive models at C3.ai.',
  LangChain: 'Used for enterprise retrieval and generation workflows at C3.ai.',
  LangGraph: 'Orchestrates retrieval, memory, tools and approval in FRIDAY.',
  PySpark: 'Used to transform enterprise records and prepare model features.',
  MLflow: 'Tracked experiments, datasets and models at LTIMindtree.',
  FastAPI: 'Serves inference and retrieval workloads through REST APIs.',
  Docker: 'Packages inference services and several portfolio projects.',
  Kubernetes: 'Used with AWS to deploy ML and retrieval services.',
  'Scikit-learn': 'Used for classification, regression and model evaluation.',
};

export function SkillExplorer() {
  const [category, setCategory] = useState(0);
  const [node, setNode] = useState<string | null>(null);
  const skill = skills[category];
  return <div className="skill-explorer">
    <div className="skill-tabs" aria-label="Skill categories">
      {skills.map((group, index) => <button type="button" key={group.name} aria-pressed={category === index} onClick={() => { setCategory(index); setNode(null); }}>
        <Network size={16} />{group.name}
      </button>)}
    </div>
    <div className="skill-panel">
      <h3>{skill.name}</h3><p>{skill.description}</p>
      <div className="skill-nodes">
        {skill.items.map(item => <button key={item} type="button" onFocus={() => setNode(item)} onMouseEnter={() => setNode(item)} onClick={() => setNode(item)} aria-pressed={node === item}><i />{item}</button>)}
      </div>
      <p className="skill-detail" aria-live="polite">{node ? <><strong>{node}</strong> · {descriptions[node] || skill.description}</> : 'Select a skill to see its context.'}</p>
    </div>
  </div>;
}
