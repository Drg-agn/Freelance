import { useState, useEffect } from 'react'
import './AdminDashboard.css'
import { Users, Mail, Phone, Calendar, RefreshCw, Lock, Eye, EyeOff } from 'lucide-react'

const ADMIN_PASSWORD = 'roboai2026'

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false)
  const [pwInput, setPwInput] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [pwError, setPwError] = useState('')
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [lastRefresh, setLastRefresh] = useState(null)

  function handleLogin(e) {
    e.preventDefault()
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true)
      setPwError('')
    } else {
      setPwError('Incorrect password. Try again.')
    }
  }

  async function fetchEnquiries() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/enquiries')
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setEnquiries(data.data)
      setLastRefresh(new Date().toLocaleTimeString())
    } catch (err) {
      setError('Failed to load registrations. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authed) fetchEnquiries()
  }, [authed])

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  // LOGIN SCREEN
  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login-box">
          <div className="admin-login-icon"><Lock size={28} /></div>
          <h2>Admin Access</h2>
          <p>Enter the admin password to view registrations</p>
          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-pw-wrap">
              <input
                type={showPw ? 'text' : 'password'}
                placeholder="Enter password"
                value={pwInput}
                onChange={e => setPwInput(e.target.value)}
                autoFocus
              />
              <button type="button" className="pw-toggle" onClick={() => setShowPw(s => !s)}>
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {pwError && <span className="admin-pw-error">{pwError}</span>}
            <button type="submit" className="admin-login-btn">Login</button>
          </form>
        </div>
      </div>
    )
  }

  // DASHBOARD SCREEN
  return (
    <div className="admin-dash">
      <div className="admin-header">
        <div>
          <h1>Registrations</h1>
          {lastRefresh && <p className="admin-refresh-time">Last updated: {lastRefresh}</p>}
        </div>
        <div className="admin-header-right">
          <div className="admin-count-badge">
            <Users size={16} />
            <span>{enquiries.length} Registered</span>
          </div>
          <button className="admin-refresh-btn" onClick={fetchEnquiries} disabled={loading}>
            <RefreshCw size={15} className={loading ? 'spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {loading && !enquiries.length ? (
        <div className="admin-loading">
          <RefreshCw size={24} className="spin" />
          <p>Loading registrations...</p>
        </div>
      ) : enquiries.length === 0 ? (
        <div className="admin-empty">
          <Users size={40} />
          <p>No registrations yet.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Registered On</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e, i) => (
                <tr key={e._id}>
                  <td className="admin-num">{i + 1}</td>
                  <td className="admin-name">{e.name}</td>
                  <td>
                    <a href={`mailto:${e.email}`} className="admin-link">
                      <Mail size={13} />{e.email}
                    </a>
                  </td>
                  <td>
                    <a href={`tel:${e.phone}`} className="admin-link">
                      <Phone size={13} />{e.phone}
                    </a>
                  </td>
                  <td>
                    <span className="admin-date">
                      <Calendar size={13} />{formatDate(e.createdAt)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}