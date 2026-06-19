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

  if (isAdmin) return <AdminDashboard />

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