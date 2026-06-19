import './WorkshopDetails.css'
import { Users, Clock, Monitor, IndianRupee, CalendarDays } from 'lucide-react'

const details = [
  { icon: <Users size={20} />, label: 'Age Group', value: '8–14 Years' },
  { icon: <Clock size={20} />, label: 'Duration', value: '4 Weeks' },
  { icon: <Monitor size={20} />, label: 'Mode', value: 'Online (Live)' },
  { icon: <IndianRupee size={20} />, label: 'Fee', value: '₹2,999' },
  { icon: <CalendarDays size={20} />, label: 'Start Date', value: '15 July 2026' },
]

export default function WorkshopDetails() {
  return (
    <section className="section" id="details">
      <div className="container">
        <p className="section-label">// workshop.config</p>
        <h2 className="section-title">Everything You Need to Know</h2>
        <div className="details-grid">
          {details.map((d) => (
            <div key={d.label} className="detail-card">
              <div className="detail-icon">{d.icon}</div>
              <div>
                <span className="detail-label">{d.label}</span>
                <span className="detail-value">{d.value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="details-about">
          <p>
            This isn't a passive video course. Every session is live, interactive, and
            project-driven. Participants will work with real AI APIs and build a robot
            by end of Week 4 — guided by expert mentors.
          </p>
        </div>
      </div>
    </section>
  )
}