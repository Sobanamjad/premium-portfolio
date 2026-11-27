import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

// Create table if it doesn't exist
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS services (
      id          SERIAL PRIMARY KEY,
      title       TEXT        NOT NULL,
      description TEXT        NOT NULL,
      features    TEXT[],
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

    // GET — fetch all services
    if (req.method === 'GET') {
      const services = await sql`
        SELECT id, title, description, features, created_at, updated_at
        FROM services
        ORDER BY id
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ services }))
    }

    // POST — create new service
    if (req.method === 'POST') {
      const { title, description, features } = req.body ?? {}
      if (!title?.trim() || !description?.trim()) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'title and description are required' }))
      }

      const result = await sql`
        INSERT INTO services (title, description, features)
        VALUES (${title.trim()}, ${description.trim()}, ${features || []})
        RETURNING id, title, description, features, created_at, updated_at
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ service: result[0] }))
    }

    // PUT — update service
    if (req.method === 'PUT') {
      const { id, title, description, features } = req.body ?? {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'id is required' }))
      }

      const result = await sql`
        UPDATE services
        SET title = ${title.trim()},
            description = ${description.trim()},
            features = ${features || []},
            updated_at = NOW()
        WHERE id = ${id}
        RETURNING id, title, description, features, created_at, updated_at
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ service: result[0] }))
    }

    // DELETE — delete service
    if (req.method === 'DELETE') {
      const id = req.query?.id || new URL(req.url, 'http://x').searchParams.get('id')
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'id required' }))
      }
      await sql`DELETE FROM services WHERE id = ${id}`
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ success: true }))
    }

    res.writeHead(405, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  } catch (err) {
    console.error('Services error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
