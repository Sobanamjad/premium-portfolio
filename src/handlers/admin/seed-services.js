import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

const staticServices = [
  {
    title: 'Full-Stack Development',
    description: 'End-to-end web applications built with modern, scalable architectures — from database schema to pixel-perfect UI.',
    features: ['REST & GraphQL APIs', 'Database design', 'Auth & security'],
  },
  {
    title: 'Frontend Engineering',
    description: 'Fast, accessible, and delightful interfaces using React, Next.js and modern animation libraries.',
    features: ['Component systems', 'Performance tuning', 'Micro-interactions'],
  },
  {
    title: 'Mobile App Development',
    description: 'Cross-platform mobile apps with React Native that feel native, ship fast, and share code with the web.',
    features: ['iOS & Android', 'Offline-first', 'Push notifications'],
  },
  {
    title: 'Cloud & DevOps',
    description: 'CI/CD pipelines, containerized deployments, and cloud infrastructure that scale with your product.',
    features: ['Docker & Kubernetes', 'AWS / GCP', 'Monitoring & alerts'],
  },
  {
    title: 'UI/UX Consulting',
    description: 'Design-system thinking and prototyping to turn rough ideas into coherent, usable product experiences.',
    features: ['Wireframing', 'Design systems', 'Usability review'],
  },
  {
    title: 'Performance Audits',
    description: 'Deep technical audits covering Core Web Vitals, bundle size, and rendering strategy with an actionable roadmap.',
    features: ['Lighthouse deep-dive', 'Bundle analysis', 'SEO health'],
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
    // Check if services already exist
    const existing = await sql`SELECT COUNT(*) as count FROM services`
    if (existing[0].count > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Services already exist', count: existing[0].count }))
    }

    // Insert static services
    for (const service of staticServices) {
      await sql`
        INSERT INTO services (title, description, features)
        VALUES (${service.title}, ${service.description}, ${service.features})
      `
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Services seeded successfully', count: staticServices.length }))
  } catch (err) {
    console.error('Seed error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
