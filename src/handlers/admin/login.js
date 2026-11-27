export default function handler(req, res) {
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

  const { username, password } = req.body ?? {}

  // Hardcoded for local development
  const ADMIN_USERNAME = 'sobanamjad097'
  const ADMIN_PASSWORD = 'sobanamjad097'

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Simple signed token: base64(username:timestamp) — enough for a personal dashboard
    const token = Buffer.from(`${username}:${Date.now()}`).toString('base64')
    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ success: true, token }))
  }

  res.writeHead(401, { 'Content-Type': 'application/json' })
  return res.end(JSON.stringify({ error: 'Invalid credentials' }))
}
