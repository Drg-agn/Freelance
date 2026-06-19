import './Navbar.css'
import { Bot, LayoutDashboard } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <div className="nav-logo">
          <Bot size={22} color="var(--neon)" />
          <span>RoboAI</span>
        </div>
        <div className="nav-right">
          <a href="/?admin=true" className="nav-admin">
            <LayoutDashboard size={15} />
            Admin Panel
          </a>
          <a href="#register" className="nav-cta">Enroll Now</a>
        </div>
      </div>
    </nav>
  )
}