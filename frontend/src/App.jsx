import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WorkshopDetails from './components/WorkshopDetails'
import LearningOutcomes from './components/LearningOutcomes'
import FAQ from './components/FAQ'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'

export default function App() {
  const isAdmin = window.location.search.includes('admin=true')
  const isNotFound = !isAdmin && window.location.pathname !== '/'

  // 404 Page
  if (isNotFound) {
    return (
      <div className="not-found">
        <h1 className="not-found-code">404</h1>
        <p className="not-found-msg">Oops! This page doesn't exist.</p>
        <a href="/" className="not-found-link">← Go Back Home</a>
      </div>
    )
  }

  // Admin Dashboard
  if (isAdmin) {
    return <AdminDashboard />
  }

  // Main Landing Page
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkshopDetails />
        <LearningOutcomes />
        <FAQ />
        <RegistrationForm />
      </main>
      <Footer />
    </>
  )
}