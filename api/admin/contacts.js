import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

function verifyToken(req) {
  const auth = req.headers['authorization'] || ''
  const token = auth.replace('Bearer ', '').trim()
  if (!token) return false
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8')
    const [username] = decoded.split(':')
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'sobanamjad097'
    return username === ADMIN_USERNAME
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') return res.status(200).end()

  if (!verifyToken(req)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    // GET — fetch all contacts
    if (req.method === 'GET') {
      const contacts = await sql`
        SELECT id, name, email, subject, message, created_at
        FROM contacts
        ORDER BY created_at DESC
      `
      return res.status(200).json({ contacts })
    }

    // DELETE — delete single contact by id (?id=x)
    if (req.method === 'DELETE') {
      const id = req.query?.id || new URL(req.url, 'http://x').searchParams.get('id')
      if (!id) return res.status(400).json({ error: 'id required' })
      await sql`DELETE FROM contacts WHERE id = ${id}`
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    console.error('Admin contacts error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
