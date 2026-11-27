import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

// Create table if it doesn't exist
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id          SERIAL PRIMARY KEY,
      title       TEXT        NOT NULL,
      description TEXT        NOT NULL,
      tech        TEXT[]      NOT NULL,
      github      TEXT,
      live        TEXT,
      image       TEXT        NOT NULL,
      category    TEXT        NOT NULL,
      status      TEXT        NOT NULL,
      featured    BOOLEAN     NOT NULL DEFAULT FALSE,
      year        INTEGER     NOT NULL,
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

    // GET — fetch all projects
    if (req.method === 'GET') {
      const projects = await sql`
        SELECT id, title, description, tech, github, live, image, category, status, featured, year, created_at, updated_at
        FROM projects
        ORDER BY id
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ projects }))
    }

    // POST — create new project
    if (req.method === 'POST') {
      const { title, description, tech, github, live, image, category, status, featured, year } = req.body ?? {}
      if (!title?.trim() || !description?.trim() || !image?.trim() || !category?.trim() || !status?.trim() || !year) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'title, description, image, category, status, and year are required' }))
      }

      const result = await sql`
        INSERT INTO projects (title, description, tech, github, live, image, category, status, featured, year)
        VALUES (${title.trim()}, ${description.trim()}, ${tech || []}, ${github || null}, ${live || null}, ${image.trim()}, ${category.trim()}, ${status.trim()}, ${featured || false}, ${year})
        RETURNING id, title, description, tech, github, live, image, category, status, featured, year, created_at, updated_at
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ project: result[0] }))
    }

    // PUT — update project
    if (req.method === 'PUT') {
      const { id, title, description, tech, github, live, image, category, status, featured, year } = req.body ?? {}
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'id is required' }))
      }

      const result = await sql`
        UPDATE projects
        SET title = ${title.trim()},
            description = ${description.trim()},
            tech = ${tech || []},
            github = ${github || null},
            live = ${live || null},
            image = ${image.trim()},
            category = ${category.trim()},
            status = ${status.trim()},
            featured = ${featured || false},
            year = ${year},
            updated_at = NOW()
        WHERE id = ${id}
        RETURNING id, title, description, tech, github, live, image, category, status, featured, year, created_at, updated_at
      `
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ project: result[0] }))
    }

    // DELETE — delete project
    if (req.method === 'DELETE') {
      const id = req.query?.id || new URL(req.url, 'http://x').searchParams.get('id')
      if (!id) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({ error: 'id required' }))
      }
      await sql`DELETE FROM projects WHERE id = ${id}`
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ success: true }))
    }

    res.writeHead(405, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  } catch (err) {
    console.error('Projects error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
