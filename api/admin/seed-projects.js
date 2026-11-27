import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

const staticProjects = [
  {
    title: 'News Magic box',
    description: 'MagicBox is a modern news aggregation platform that automatically collects and displays news from multiple RSS feeds across various categories. The platform provides users with a seamless reading experience with real-time updates, image optimization, and responsive design',
    tech: ['Codignator', 'TailwindCss', 'MySQL', 'PHP'],
    github: 'https://github.com/Sobanamjad/news-magicbox-mg',
    live: 'https://news.magicbox.mg/',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600&auto=format&fit=crop',
    category: 'Full-Stack',
    status: 'Live',
    featured: true,
    year: 2025,
  },
  {
    title: 'University Management System',
    description: 'UMS is a comprehensive academic administration platform that simplifies university management through role-based dashboards, automated workflows, and real-time data insights.',
    tech: ['NextJS', 'PayloadCms', 'PostgreSql', 'TailwindCss'],
    github: 'https://github.com/Sobanamjad/University-Management-System',
    live: 'https://university-management-system-jesiciboq-soban-amjads-projects.vercel.app/',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop',
    category: 'Full-Stack',
    status: 'Live',
    featured: true,
    year: 2025,
  },
  {
    title: 'MiVue Manufaccturing Insight',
    description: 'ACS Frontend is a Vue 3 + Vuetify 3 based manufacturing insight platform for machine monitoring, downtime tracking fleet management, and analytics. It provides real-time data visualization, reporting, and administrative controls for industrial operations.',
    tech: ['Vue3', 'Laravel', 'MySql'],
    github: 'https://github.com/Sobanamjad/acs-frontend-vue3-soban',
    live: 'https://staging.mivue.io/',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop',
    category: 'Full-Stack',
    status: 'Live',
    featured: true,
    year: 2024,
  },
  {
    title: 'Elixer Vie',
    description: 'Elixer Vie is a modern frontend project translated from a Figma design into a fully responsive React interface. Built with Tailwind CSS, it features clean UI components, smooth layouts, and pixel-perfect design implementation.',
    tech: ['React', 'Tailwind'],
    github: 'https://github.com/Sobanamjad/figma-design',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
    category: 'Frontend',
    status: 'Maintained',
    featured: false,
    year: 2024,
  },
  {
    title: 'Political Sentiment Analyser',
    description: 'End-to-end sentiment analysis system for classifying political text — Python/Scikit-learn NLP model on the backend with a Next.js frontend. Currently training and evaluating the model.',
    tech: ['Python', 'Scikit-learn', 'Next.js', 'NLP', 'Pandas'],
    github: 'https://github.com/Sobanamjad',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1600&auto=format&fit=crop',
    category: 'Data & ML',
    status: 'In Progress',
    featured: true,
    year: 2025,
  },
  {
    title: 'Sales Prediction Model',
    description: 'Sales forecasting model covering data cleaning, feature preparation and model evaluation. Built with Python, Pandas, NumPy and Scikit-learn.',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn'],
    github: 'https://github.com/Sobanamjad',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop',
    category: 'Data & ML',
    status: 'Live',
    featured: false,
    year: 2024,
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
    // Check if projects already exist
    const existing = await sql`SELECT COUNT(*) as count FROM projects`
    if (existing[0].count > 0) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      return res.end(JSON.stringify({ message: 'Projects already exist', count: existing[0].count }))
    }

    // Insert static projects
    for (const project of staticProjects) {
      await sql`
        INSERT INTO projects (title, description, tech, github, live, image, category, status, featured, year)
        VALUES (${project.title}, ${project.description}, ${project.tech}, ${project.github}, ${project.live}, ${project.image}, ${project.category}, ${project.status}, ${project.featured}, ${project.year})
      `
    }

    res.writeHead(200, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ message: 'Projects seeded successfully', count: staticProjects.length }))
  } catch (err) {
    console.error('Seed error:', err)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'Server error' }))
  }
}
