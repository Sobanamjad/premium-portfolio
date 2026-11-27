import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

// Create table if it doesn't exist (runs on cold start — safe to call every time)
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS contacts (
      id         SERIAL PRIMARY KEY,
      name       TEXT        NOT NULL,
      email      TEXT        NOT NULL,
      subject    TEXT,
      message    TEXT        NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

export default async function handler(req, res) {
  // CORS headers — allow your frontend origin
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  }

  const { name, email, subject, message } = req.body ?? {}

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'name, email and message are required' }))
  }

  try {
    await ensureTable()

    await sql`
      INSERT INTO contacts (name, email, subject, message)
      VALUES (${name.trim()}, ${email.trim()}, ${subject?.trim() ?? ''}, ${message.trim()})
    `

    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ success: true }))
  } catch (err) {
    console.error('DB error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Failed to save message' }))
  }
}
