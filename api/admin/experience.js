import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

// Create table if it doesn't exist
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS experience (
      id          SERIAL PRIMARY KEY,
      role        TEXT        NOT NULL,
      company     TEXT        NOT NULL,
      location    TEXT        NOT NULL,
      period      TEXT        NOT NULL,
      description TEXT        NOT NULL,
      tech        TEXT[]      NOT NULL,
      type        TEXT        NOT NULL DEFAULT 'work',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

function verifyToken(req) {
  const auth = req.headers['authorization'] || ''
  const token = auth.replace('Bearer ', '').trim()
  if (!token) return false
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8')
    const [username] = decoded.split(':')
    const ADMIN_USERNAME = 'sobanamjad097'
    return username === ADMIN_USERNAME
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }

  if (!verifyToken(req)) {
    res.writeHead(401, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Unauthorized' }))
  }

  try {
    await ensureTable()

    // GET — fetch all experience
    if (req.method === 'GET') {
      const experience = await sql`
        SELECT id, role, company, location, period, description, tech, type, created_at, updated_at
        FROM experience
        ORDER BY id
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ experience }))
    }

    // POST — create new experience
    if (req.method === 'POST') {
      const { role, company, location, period, description, tech, type } = req.body ?? {}
      if (!role?.trim() || !company?.trim() || !location?.trim() || !period?.trim() || !description?.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'role, company, location, period, and description are required' }))
      }

      const result = await sql`
        INSERT INTO experience (role, company, location, period, description, tech, type)
        VALUES (${role.trim()}, ${company.trim()}, ${location.trim()}, ${period.trim()}, ${description.trim()}, ${tech || []}, ${type || 'work'})
        RETURNING id, role, company, location, period, description, tech, type, created_at, updated_at
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ experience: result[0] }))
    }

    // PUT — update experience
    if (req.method === 'PUT') {
      const { id, role, company, location, period, description, tech, type } = req.body ?? {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'id is required' }))
      }

      const result = await sql`
        UPDATE experience
        SET role = ${role.trim()},
            company = ${company.trim()},
            location = ${location.trim()},
            period = ${period.trim()},
            description = ${description.trim()},
            tech = ${tech || []},
            type = ${type || 'work'},
            updated_at = NOW()
        WHERE id = ${id}
        RETURNING id, role, company, location, period, description, tech, type, created_at, updated_at
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ experience: result[0] }))
    }

    // DELETE — delete experience
    if (req.method === 'DELETE') {
      const id = req.query?.id || new URL(req.url, 'http://x').searchParams.get('id')
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'id required' }))
      }
      await sql`DELETE FROM experience WHERE id = ${id}`
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ success: true }))
    }

    res.writeHead(405, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  } catch (err) {
    console.error('Experience error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
