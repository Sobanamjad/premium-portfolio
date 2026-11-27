import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

const staticExperience = [
  {
    role: 'Full-Stack Developer',
    company: 'HiBitTech',
    location: 'Multan',
    period: 'Sep 2025 — Present',
    description: "Building and maintaining MERN stack applications using Next.js, React and PostgreSQL. Designing database schemas and writing SQL queries to support application features and reporting. Contributing to the company's in-house AI system — working on data handling and backend/frontend integration.",
    tech: ['Next.js', 'Payload CMS', 'PostgreSQL', 'Docker', 'GitHub Actions'],
    type: 'work',
  },
  {
    role: 'Freelance Web Developer',
    company: 'CheckItOut.io',
    location: 'Remote',
    period: 'Dec 2024 — present',
    description: 'Developed and maintained custom websites and web applications for small business clients using Laravel, PHP, HTML, and CSS. Built responsive and performance-optimized interfaces, implemented custom features and backend logic, and handled ongoing updates, bug fixes, and client-requested enhancements to improve functionality and user experience.',
    tech: ['JavaScript', 'PHP', 'CSS', 'Laravel'],
    type: 'work',
  },
  {
    role: 'Developer',
    company: 'Next Codify',
    location: 'Multan',
    period: 'May 2024 — Sep 2025',
    description: 'Developed and maintained web applications using React, Laravel and Node.js with MySQL. Worked with relational data — schema design, queries, and backend–database integration. Alongside development, trained ML models (price prediction, sentiment analysis) using Python, Pandas, NumPy and Scikit-learn, including data cleaning and feature preparation.',
    tech: ['Laravel', 'PHP', 'React', 'MySQL', 'Python', 'Pandas', 'Scikit-learn'],
    type: 'work',
  },
  {
    role: 'Junior Developer',
    company: 'Zindex',
    location: 'Multan',
    period: 'Aug 2023 — May 2024',
    description: 'Developed features in Laravel and React for client projects, working with MySQL databases. Collaborated with the team using Git-based workflows.',
    tech: ['Laravel', 'React', 'MySQL', 'Git'],
    type: 'work',
  },
  {
    role: 'Intern (Laravel & React)',
    company: 'Zindex',
    location: 'Multan',
    period: 'May 2023 — Aug 2023',
    description: '3-month internship building Laravel and React features, later converted to a full-time junior developer role.',
    tech: ['Laravel', 'React', 'HTML', 'Tailwind'],
    type: 'work',
  },
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
    // Check if experience already exist
    const existing = await sql`SELECT COUNT(*) as count FROM experience`
    if (existing[0].count > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Experience already exist', count: existing[0].count }))
    }

    // Insert static experience
    for (const exp of staticExperience) {
      await sql`
        INSERT INTO experience (role, company, location, period, description, tech, type)
        VALUES (${exp.role}, ${exp.company}, ${exp.location}, ${exp.period}, ${exp.description}, ${exp.tech}, ${exp.type})
      `
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Experience seeded successfully', count: staticExperience.length }))
  } catch (err) {
    console.error('Seed error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
