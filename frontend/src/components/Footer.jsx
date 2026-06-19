import './Footer.css'
import { Bot } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Bot size={18} color="var(--neon)" />
          <span>RoboAI Workshop</span>
        </div>
        <p className="footer-copy">© 2026 RoboAI. Built for curious minds.</p>
      </div>
    </footer>
  )
}