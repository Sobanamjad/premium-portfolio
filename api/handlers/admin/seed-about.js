import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

const staticAbout = {
  eyebrow: 'About Me',
  title: 'Building products with craft and curiosity',
  subtitle: "I'm a senior full-stack developer with 3+ years of experience turning ambitious ideas into fast, reliable, and beautifully-crafted software.",
  description: [
    "My path into engineering started with a curiosity about why interfaces feel good to use — that question eventually pulled me into the entire stack, from database schema to motion design.",
    "Today I lead product engineering at Nova Digital Labs, where I help small teams ship ambitious products without sacrificing quality. I care deeply about performance, accessibility, and the small details that make software feel premium.",
    "Outside of client work, I maintain a couple of open-source libraries and mentor junior developers transitioning into full-stack roles."
  ],
  cv_link: '/soban-resume.pdf',
  stats: [
    { id: 1, icon: 'FiBriefcase', value: 3, suffix: '+', label: 'Years Experience' },
    { id: 2, icon: 'FiCode', value: 25, suffix: '+', label: 'Projects Shipped' },
    { id: 3, icon: 'FiUsers', value: 6, suffix: '+', label: 'Happy Clients' },
    { id: 4, icon: 'FiAward', value: 2, suffix: '', label: 'Awards & Certs' },
  ]
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Method not allowed' }))
  }

  try {
    // Check if about already exists
    const existing = await sql`SELECT COUNT(*) as count FROM about`
    if (existing[0].count > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'About content already exists', count: existing[0].count }))
    }

    // Insert static about
    await sql`
      INSERT INTO about (eyebrow, title, subtitle, description, cv_link, stats)
      VALUES (${staticAbout.eyebrow}, ${staticAbout.title}, ${staticAbout.subtitle}, ${staticAbout.description}, ${staticAbout.cv_link}, ${JSON.stringify(staticAbout.stats)})
    `

    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'About content seeded successfully' }))
  } catch (err) {
    console.error('Seed error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
