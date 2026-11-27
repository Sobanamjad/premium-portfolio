// Helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(body || '{}')) }
      catch { resolve({}) }
    })
  })
}

// Token verification
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
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }

  // Verify token for seed routes (login doesn't need token)
  const url = new URL(req.url, `http://${req.headers.host}`)
  const path = url.pathname
  if (!path.includes('login') && !verifyToken(req)) {
    res.writeHead(401, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Unauthorized' }))
  }

  // Parse body for POST requests
  if (req.method === 'POST') {
    req.body = await parseBody(req)
  }

  // Parse query params
  const url = new URL(req.url, `http://${req.headers.host}`)
  req.query = Object.fromEntries(url.searchParams.entries())
  const path = url.pathname

  try {
    if (path === '/api/admin/login') {
      const { default: handler } = await import('./handlers/admin/login.js')
      return await handler(req, res)
    }
    if (path === '/api/admin/seed-skills') {
      const { default: handler } = await import('./handlers/admin/seed-skills.js')
      return await handler(req, res)
    }
    if (path === '/api/admin/seed-services') {
      const { default: handler } = await import('./handlers/admin/seed-services.js')
      return await handler(req, res)
    }
    if (path === '/api/admin/seed-projects') {
      const { default: handler } = await import('./handlers/admin/seed-projects.js')
      return await handler(req, res)
    }
    if (path === '/api/admin/seed-experience') {
      const { default: handler } = await import('./handlers/admin/seed-experience.js')
      return await handler(req, res)
    }
    if (path === '/api/admin/seed-about') {
      const { default: handler } = await import('./handlers/admin/seed-about.js')
      return await handler(req, res)
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Not found' }))
  } catch (err) {
    console.error('Admin System API error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
