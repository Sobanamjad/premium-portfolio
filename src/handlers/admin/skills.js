import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

// Create table if it doesn't exist
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS skills (
      id         SERIAL PRIMARY KEY,
      category   TEXT        NOT NULL,
      name       TEXT        NOT NULL,
      level      INTEGER     NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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

    // GET — fetch all skills
    if (req.method === 'GET') {
      const skills = await sql`
        SELECT id, category, name, level, created_at, updated_at
        FROM skills
        ORDER BY category, name
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ skills }))
    }

    // POST — create new skill
    if (req.method === 'POST') {
      const { category, name, level } = req.body ?? {}
      if (!category?.trim() || !name?.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'category and name are required' }))
      }

      const result = await sql`
        INSERT INTO skills (category, name, level)
        VALUES (${category.trim()}, ${name.trim()}, ${level || 0})
        RETURNING id, category, name, level, created_at, updated_at
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ skill: result[0] }))
    }

    // PUT — update skill
    if (req.method === 'PUT') {
      const { id, category, name, level } = req.body ?? {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'id is required' }))
      }

      const result = await sql`
        UPDATE skills
        SET category = ${category.trim()},
            name = ${name.trim()},
            level = ${level || 0},
            updated_at = NOW()
        WHERE id = ${id}
        RETURNING id, category, name, level, created_at, updated_at
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ skill: result[0] }))
    }

    // DELETE — delete skill
    if (req.method === 'DELETE') {
      const id = req.query?.id || new URL(req.url, 'http://x').searchParams.get('id')
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'id required' }))
      }
      await sql`DELETE FROM skills WHERE id = ${id}`
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ success: true }))
    }

    res.writeHead(405, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  } catch (err) {
    console.error('Skills error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
