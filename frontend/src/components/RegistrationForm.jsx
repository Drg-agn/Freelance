import { useState } from 'react'
import './RegistrationForm.css'
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'

const INITIAL = { name: '', email: '', phone: '' }
const INITIAL_ERRORS = { name: '', email: '', phone: '' }

function validate(fields) {
  const errs = { ...INITIAL_ERRORS }
  if (!fields.name.trim()) errs.name = 'Name is required.'
  else if (fields.name.trim().length < 2) errs.name = 'Name must be at least 2 characters.'
  if (!fields.email.trim()) errs.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email address.'
  if (!fields.phone.trim()) errs.phone = 'Phone number is required.'
  else if (!/^[6-9]\d{9}$/.test(fields.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit Indian mobile number.'
  return errs
}

export default function RegistrationForm() {
  const [fields, setFields] = useState(INITIAL)
  const [errors, setErrors] = useState(INITIAL_ERRORS)
  const [touched, setTouched] = useState({ name: false, email: false, phone: false })
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFields(f => ({ ...f, [name]: value }))
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value })
      setErrors(errs)
    }
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(validate(fields))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setTouched({ name: true, email: true, phone: true })
    const errs = validate(fields)
    setErrors(errs)
    if (Object.values(errs).some(Boolean)) return
    setStatus('loading')
    setServerError('')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Something went wrong.')
      setStatus('success')
      setFields(INITIAL)
      setTouched({ name: false, email: false, phone: false })
    } catch (err) {
      setStatus('error')
      setServerError(err.message)
    }
  }

  if (status === 'success') {
    return (
      <section className="section register-section" id="register">
        <div className="container register-container">
          <div className="success-state">
            <CheckCircle size={48} color="var(--neon)" />
            <h2>You're Enrolled!</h2>
            <p>We've received your registration. Our team will reach out within 24 hours with payment details.</p>
            <button className="btn-reset" onClick={() => setStatus('idle')}>Register Another</button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section register-section circuit-bg" id="register">
      <div className="register-glow" />
      <div className="container register-container">
        <div className="register-left">
          <p className="section-label">// register.submit()</p>
          <h2 className="section-title">Secure Your Seat</h2>
          <p className="register-sub">Seats are limited to 30 students per cohort. Fill in your details and we'll get in touch within 24 hours.</p>
          <ul className="register-perks">
            <li>✦ Live interactive sessions</li>
            <li>✦ Lifetime recording access</li>
            <li>✦ Certificate of completion</li>
            <li>✦ Mentor support on Discord</li>
          </ul>
        </div>
        <div className="register-form-wrap">
          <form onSubmit={handleSubmit} className="register-form" noValidate>
            <div className={`form-field ${errors.name && touched.name ? 'form-field--error' : ''}`}>
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" placeholder="e.g. Aryan Sharma"
                value={fields.name} onChange={handleChange} onBlur={handleBlur} />
              {errors.name && touched.name && <span className="field-error"><AlertCircle size={12} />{errors.name}</span>}
            </div>
            <div className={`form-field ${errors.email && touched.email ? 'form-field--error' : ''}`}>
              <label htmlFor="email">Email Address</label>
              <input id="email" name="email" type="email" placeholder="e.g. parent@gmail.com"
                value={fields.email} onChange={handleChange} onBlur={handleBlur} />
              {errors.email && touched.email && <span className="field-error"><AlertCircle size={12} />{errors.email}</span>}
            </div>
            <div className={`form-field ${errors.phone && touched.phone ? 'form-field--error' : ''}`}>
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" name="phone" type="tel" placeholder="e.g. 9876543210"
                value={fields.phone} onChange={handleChange} onBlur={handleBlur} />
              {errors.phone && touched.phone && <span className="field-error"><AlertCircle size={12} />{errors.phone}</span>}
            </div>
            {status === 'error' && (
              <div className="server-error">
                <AlertCircle size={14} />
                {serverError || 'Registration failed. Please try again.'}
              </div>
            )}
            <button type="submit" className="form-submit" disabled={status === 'loading'}>
              {status === 'loading' ? (<><Loader size={18} className="spin" />Submitting…</>) : (<><Send size={18} />Register</>)}
            </button>
            <p className="form-note">No payment now. We'll collect after confirmation.</p>
          </form>
        </div>
      </div>
    </section>
  )
}