import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

// Create table if it doesn't exist
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS about (
      id          SERIAL PRIMARY KEY,
      eyebrow     TEXT        NOT NULL,
      title       TEXT        NOT NULL,
      subtitle    TEXT        NOT NULL,
      description TEXT[]      NOT NULL,
      cv_link     TEXT,
      stats       JSONB       NOT NULL DEFAULT '[]'::jsonb,
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
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

    // GET — fetch about content
    if (req.method === 'GET') {
      const about = await sql`
        SELECT id, eyebrow, title, subtitle, description, cv_link, stats, created_at, updated_at
        FROM about
        LIMIT 1
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ about: about[0] || null }))
    }

    // POST — create about content
    if (req.method === 'POST') {
      const { eyebrow, title, subtitle, description, cv_link, stats } = req.body ?? {}
      if (!eyebrow?.trim() || !title?.trim() || !subtitle?.trim() || !description?.length) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'eyebrow, title, subtitle, and description are required' }))
      }

      const result = await sql`
        INSERT INTO about (eyebrow, title, subtitle, description, cv_link, stats)
        VALUES (${eyebrow.trim()}, ${title.trim()}, ${subtitle.trim()}, ${description}, ${cv_link || null}, ${JSON.stringify(stats || [])})
        RETURNING id, eyebrow, title, subtitle, description, cv_link, stats, created_at, updated_at
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ about: result[0] }))
    }

    // PUT — update about content
    if (req.method === 'PUT') {
      const { id, eyebrow, title, subtitle, description, cv_link, stats } = req.body ?? {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'id is required' }))
      }

      const result = await sql`
        UPDATE about
        SET eyebrow = ${eyebrow.trim()},
            title = ${title.trim()},
            subtitle = ${subtitle.trim()},
            description = ${description},
            cv_link = ${cv_link || null},
            stats = ${JSON.stringify(stats || [])},
            updated_at = NOW()
        WHERE id = ${id}
        RETURNING id, eyebrow, title, subtitle, description, cv_link, stats, created_at, updated_at
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ about: result[0] }))
    }

    res.writeHead(405, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  } catch (err) {
    console.error('About error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
