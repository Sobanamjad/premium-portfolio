import { FiCode, FiLayers, FiSmartphone, FiCloudLightning, FiPenTool, FiTrendingUp } from 'react-icons/fi'

// Icon mapping for services
const iconMap = {
  'Full-Stack Development': FiCode,
  'Frontend Engineering': FiLayers,
  'Mobile App Development': FiSmartphone,
  'Cloud & DevOps': FiCloudLightning,
  'UI/UX Consulting': FiPenTool,
  'Performance Audits': FiTrendingUp,
}

export const getServiceIcon = (title) => {
  return iconMap[title] || FiCode
}

// Fetch services from API
export async function fetchServices() {
  try {
    const res = await fetch('/api/services')
    const data = await res.json()
    return data.services || []
  } catch (err) {
    console.error('Failed to fetch services:', err)
    return []
  }
}

// Fallback static data
export const services = [
  {
    id: 1,
    icon: FiCode,
    title: 'Full-Stack Development',
    description: 'End-to-end web applications built with modern, scalable architectures — from database schema to pixel-perfect UI.',
    features: ['REST & GraphQL APIs', 'Database design', 'Auth & security'],
  },
  {
    id: 2,
    icon: FiLayers,
    title: 'Frontend Engineering',
    description: 'Fast, accessible, and delightful interfaces using React, Next.js and modern animation libraries.',
    features: ['Component systems', 'Performance tuning', 'Micro-interactions'],
  },
  {
    id: 3,
    icon: FiSmartphone,
    title: 'Mobile App Development',
    description: 'Cross-platform mobile apps with React Native that feel native, ship fast, and share code with the web.',
    features: ['iOS & Android', 'Offline-first', 'Push notifications'],
  },
  {
    id: 4,
    icon: FiCloudLightning,
    title: 'Cloud & DevOps',
    description: 'CI/CD pipelines, containerized deployments, and cloud infrastructure that scale with your product.',
    features: ['Docker & Kubernetes', 'AWS / GCP', 'Monitoring & alerts'],
  },
  {
    id: 5,
    icon: FiPenTool,
    title: 'UI/UX Consulting',
    description: 'Design-system thinking and prototyping to turn rough ideas into coherent, usable product experiences.',
    features: ['Wireframing', 'Design systems', 'Usability review'],
  },
  {
    id: 6,
    icon: FiTrendingUp,
    title: 'Performance Audits',
    description: 'Deep technical audits covering Core Web Vitals, bundle size, and rendering strategy with an actionable roadmap.',
    features: ['Lighthouse deep-dive', 'Bundle analysis', 'SEO health'],
  },
]
