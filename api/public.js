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

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }

  // Parse body for POST requests
  if (req.method === 'POST') {
    req.body = await parseBody(req)
  }

  // Parse query params
  const url = new URL(req.url, `http://${req.headers.host}`)
  req.query = Object.fromEntries(url.searchParams.entries())

  // Route based on path
  const path = url.pathname

  try {
    if (path === '/api/contact') {
      const { default: handler } = await import('./handlers/contact.js')
      return await handler(req, res)
    }
    if (path === '/api/skills') {
      const { default: handler } = await import('./handlers/skills.js')
      return await handler(req, res)
    }
    if (path === '/api/services') {
      const { default: handler } = await import('./handlers/services.js')
      return await handler(req, res)
    }
    if (path === '/api/projects') {
      const { default: handler } = await import('./handlers/projects.js')
      return await handler(req, res)
    }
    if (path === '/api/experience') {
      const { default: handler } = await import('./handlers/experience.js')
      return await handler(req, res)
    }
    if (path === '/api/about') {
      const { default: handler } = await import('./handlers/about.js')
      return await handler(req, res)
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Not found' }))
  } catch (err) {
    console.error('Public API error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
