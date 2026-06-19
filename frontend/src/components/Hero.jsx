import './Hero.css'
import { Zap, ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero circuit-bg">
      <div className="hero-glow" />
      <div className="container hero-inner">
        <div className="hero-badge">
          <Zap size={13} />
          <span>Summer 2026 Cohort — Limited Seats</span>
        </div>
        <h1 className="hero-title">
          Build Robots.<br />
          <span className="hero-title-accent">Train AI.</span><br />
          Shape Tomorrow.
        </h1>
        <p className="hero-desc">
          A hands-on, project-based online workshop where kids aged 8–14 go from
          zero to building their first AI-powered robot in just 4 weeks.
          No experience needed. Just curiosity.
        </p>
        <div className="hero-actions">
          <a href="#register" className="btn-primary">
            Enroll Now — ₹2,999
            <ArrowRight size={18} />
          </a>
          <a href="#details" className="btn-ghost">See what you'll learn</a>
        </div>
      </div>
    </section>
  )
}