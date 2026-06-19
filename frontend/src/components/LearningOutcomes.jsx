import './LearningOutcomes.css'
import { BrainCircuit, Bot, Code2, Layers, Lightbulb, Trophy } from 'lucide-react'

const outcomes = [
  { icon: <BrainCircuit size={22} />, title: 'Understand Core AI Concepts', desc: 'Grasp how machine learning works through visual, age-appropriate experiments.' },
  { icon: <Bot size={22} />, title: 'Design & Build a Robot', desc: 'Program a robot to sense its environment and react intelligently using AI logic.' },
  { icon: <Code2 size={22} />, title: 'Write Real Python Code', desc: 'Go from zero to writing loops, functions, and basic ML scripts in Python.' },
  { icon: <Layers size={22} />, title: 'Solve Problems Systematically', desc: 'Learn the engineering design cycle: define → prototype → test → iterate.' },
  { icon: <Lightbulb size={22} />, title: 'Build Creative Confidence', desc: 'Present your final robot project to a live audience and explain technical work clearly.' },
  { icon: <Trophy size={22} />, title: 'Earn a Verified Certificate', desc: 'Graduate with a digital certificate and a portfolio project shareable on applications.' },
]

export default function LearningOutcomes() {
  return (
    <section className="section outcomes-section">
      <div className="container">
        <p className="section-label">// outcomes.map()</p>
        <h2 className="section-title">What You'll Walk Away With</h2>
        <div className="outcomes-grid">
          {outcomes.map((o, i) => (
            <div key={i} className="outcome-card">
              <div className="outcome-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="outcome-icon">{o.icon}</div>
              <h3 className="outcome-title">{o.title}</h3>
              <p className="outcome-desc">{o.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}