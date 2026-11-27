import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

const staticSkills = [
  { category: 'Frontend', name: 'HTML5', level: 98 },
  { category: 'Frontend', name: 'CSS3', level: 96 },
  { category: 'Frontend', name: 'Bootstrap', level: 94 },
  { category: 'Frontend', name: 'JavaScript', level: 95 },
  { category: 'Frontend', name: 'TypeScript', level: 85 },
  { category: 'Frontend', name: 'React', level: 94 },
  { category: 'Frontend', name: 'Next.js', level: 92 },
  { category: 'Frontend', name: 'Vue.js', level: 80 },
  { category: 'Frontend', name: 'Tailwind CSS', level: 95 },
  { category: 'Backend', name: 'PHP', level: 95 },
  { category: 'Backend', name: 'Laravel', level: 92 },
  { category: 'Backend', name: 'CodeIgniter', level: 88 },
  { category: 'Backend', name: 'Payload CMS', level: 90 },
  { category: 'Backend', name: 'Node.js', level: 93 },
  { category: 'Database', name: 'PostgreSQL', level: 98 },
  { category: 'Database', name: 'MySQL', level: 82 },
  { category: 'Database', name: 'Prisma', level: 87 },
  { category: 'DevOps & Cloud', name: 'Vercel', level: 92 },
  { category: 'DevOps & Cloud', name: 'Docker', level: 86 },
  { category: 'DevOps & Cloud', name: 'GitHub Actions', level: 93 },
  { category: 'Tools & Testing', name: 'Figma', level: 80 },
  { category: 'Tools & Testing', name: 'Framer Motion', level: 90 },
  { category: 'Tools & Testing', name: 'Vite', level: 93 },
  {category: 'Tools & Testing', name: 'Postman', level: 92 },
  { category: 'Data & ML', name: 'Python', level: 85 },
  { category: 'Data & ML', name: 'Pandas', level: 82 },
  { category: 'Data & ML', name: 'NumPy', level: 80 },
  { category: 'Data & ML', name: 'Scikit-learn', level: 78 },
  { category: 'Data & ML', name: 'FastAPI', level: 80 },
]

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
    // Check if skills already exist
    const existing = await sql`SELECT COUNT(*) as count FROM skills`
    if (existing[0].count > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Skills already exist', count: existing[0].count }))
    }

    // Insert static skills
    for (const skill of staticSkills) {
      await sql`
        INSERT INTO skills (category, name, level)
        VALUES (${skill.category}, ${skill.name}, ${skill.level})
      `
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Skills seeded successfully', count: staticSkills.length }))
  } catch (err) {
    console.error('Seed error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
