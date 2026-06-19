import { useState } from 'react'
import './FAQ.css'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  { q: 'Does my child need any prior coding experience?', a: 'Not at all! We start from scratch covering basic programming in Week 1 and progressively build up to AI and robotics. All you need is curiosity and a stable internet connection.' },
  { q: 'What equipment or software is required?', a: 'Just a laptop or desktop with a browser and decent internet. All software is free and browser-based — no installation needed.' },
  { q: 'What are the class timings and how many sessions per week?', a: 'Sessions are held 3 times a week (Mon, Wed, Fri) from 5:00–6:30 PM IST. All sessions are recorded so your child can catch up anytime.' },
  { q: 'Is there a refund policy?', a: 'Full refund within 48 hours of enrollment. 50% refund within the first 7 days of the workshop start. No refunds after 7 days.' },
  { q: 'Will there be support between live sessions?', a: 'Yes! Each student gets access to a private Discord community moderated by mentors who respond within a few hours on weekdays.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  return (
    <section className="section" id="faq">
      <div className="container">
        <p className="section-label">// faq.json</p>
        <h2 className="section-title">Common Questions</h2>
        <div className="faq-list">
          {faqs.map((item, i) => (
            <div key={i} className={`faq-item ${open === i ? 'faq-item--open' : ''}`}>
              <button className="faq-trigger" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
                <span>{item.q}</span>
                <span className="faq-icon">{open === i ? <Minus size={18} /> : <Plus size={18} />}</span>
              </button>
              {open === i && <div className="faq-body"><p>{item.a}</p></div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}