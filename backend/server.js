import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectDB from './db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Connect MongoDB
connectDB()

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
}))
app.use(express.json())

// ─── Schema ───────────────────────────────────────────────────
const enquirySchema = new mongoose.Schema(
  {
    name:  { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
  },
  { timestamps: true }
)

const Enquiry = mongoose.model('Enquiry', enquirySchema)

// ─── Validation ───────────────────────────────────────────────
function validateEnquiry({ name, email, phone }) {
  const errors = []
  if (!name || name.trim().length < 2)
    errors.push('Name must be at least 2 characters.')
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email))
    errors.push('A valid email address is required.')
  const phoneRegex = /^[6-9]\d{9}$/
  if (!phone || !phoneRegex.test(phone.replace(/\s/g, '')))
    errors.push('Enter a valid 10-digit Indian mobile number.')
  return errors
}

// ─── Routes ───────────────────────────────────────────────────

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// POST /api/enquiry — submit registration
app.post('/api/enquiry', async (req, res) => {
  try {
    const { name, email, phone } = req.body

    const errors = validateEnquiry({ name, email, phone })
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors,
      })
    }

    await Enquiry.create({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
    })

    return res.status(201).json({
      success: true,
      message: 'Enquiry received! We will contact you within 24 hours.',
    })
  } catch (err) {
    console.error('POST /api/enquiry error:', err)
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
})

// GET /api/enquiries — fetch all registrations (admin)
app.get('/api/enquiries', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 })
    return res.status(200).json({
      success: true,
      count: enquiries.length,
      data: enquiries,
    })
  } catch (err) {
    console.error('GET /api/enquiries error:', err)
    return res.status(500).json({
      success: false,
      message: 'Internal server error.',
    })
  }
})

// 404
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' })
})

// ─── Start Server ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`)
})