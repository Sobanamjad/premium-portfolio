import {
  FiServer,
  FiDatabase,
  FiCloud,
  FiLayout,
  FiTool,
  FiCpu,
} from "react-icons/fi";

import {
  SiHtml5,
  SiCss,
  SiBootstrap,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiPhp,
  SiLaravel,
  SiCodeigniter,
  SiPayloadcms,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiDocker,
  SiVercel,
  SiPostman,
  SiFigma,
  SiFramer,
  SiVite,
  SiNodedotjs,
  SiGithubactions,
  SiPython,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiFastapi,
} from "react-icons/si";

// Icon mapping for skills
const iconMap = {
  'HTML5': SiHtml5,
  'CSS3': SiCss,
  'Bootstrap': SiBootstrap,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'React': SiReact,
  'Next.js': SiNextdotjs,
  'Vue.js': SiVuedotjs,
  'Tailwind CSS': SiTailwindcss,
  'PHP': SiPhp,
  'Laravel': SiLaravel,
  'CodeIgniter': SiCodeigniter,
  'Payload CMS': SiPayloadcms,
  'Node.js': SiNodedotjs,
  'PostgreSQL': SiPostgresql,
  'MySQL': SiMysql,
  'Prisma': SiPrisma,
  'Docker': SiDocker,
  'Vercel': SiVercel,
  'Postman': SiPostman,
  'Figma': SiFigma,
  'Framer Motion': SiFramer,
  'Vite': SiVite,
  'GitHub Actions': SiGithubactions,
  'Python': SiPython,
  'Pandas': SiPandas,
  'NumPy': SiNumpy,
  'Scikit-learn': SiScikitlearn,
  'FastAPI': SiFastapi,
}

export const getSkillIcon = (name) => {
  // Try exact match first
  if (iconMap[name]) return iconMap[name]
  // Try case-insensitive match
  const key = Object.keys(iconMap).find(k => k.toLowerCase() === name.toLowerCase())
  return key ? iconMap[key] : SiJavascript
}

// Fetch skills from API
export async function fetchSkills() {
  try {
    const res = await fetch('/api/skills')
    const data = await res.json()
    return data.skills || []
  } catch (err) {
    console.error('Failed to fetch skills:', err)
    return []
  }
}

// Fallback static data
export const skillCategories = [
  {
  id: "frontend",
  label: "Frontend",
  icon: FiLayout,
  skills: [
    { id: 1, name: "HTML5", icon: SiHtml5, level: 98 },
    { id: 2, name: "CSS3", icon: SiCss, level: 96 },
    { id: 3, name: "Bootstrap", icon: SiBootstrap, level: 94 },
    { id: 4, name: "JavaScript", icon: SiJavascript, level: 95 },
    { id: 5, name: "TypeScript", icon: SiTypescript, level: 85 },
    { id: 6, name: "React", icon: SiReact, level: 94 },
    { id: 7, name: "Next.js", icon: SiNextdotjs, level: 92 },
    { id: 8, name: "Vue.js", icon: SiVuedotjs, level: 80 },
    { id: 9, name: "Tailwind CSS", icon: SiTailwindcss, level: 95 },
  ],
  },
  {
  id: "backend",
  label: "Backend",
  icon: FiServer,
  skills: [
    { id: 10, name: "PHP", icon: SiPhp, level: 95 },
    { id: 11, name: "Laravel", icon: SiLaravel, level: 92 },
    { id: 12, name: "CodeIgniter", icon: SiCodeigniter, level: 88 },
    { id: 13, name: "Payload CMS", icon: SiPayloadcms, level: 90 },
    { id: 14, name: 'Node.js', icon: SiNodedotjs, level: 93 }
  ],
},
  {
    id: 'database',
    label: 'Database',
    icon: FiDatabase,
    skills: [
      { id: 15, name: 'PostgreSQL', icon: SiPostgresql, level: 98 },
      { id: 16, name: 'MySQL', icon: SiMysql, level: 82 },
      { id: 17, name: 'Prisma', icon: SiPrisma, level: 87 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    icon: FiCloud,
    skills: [
      { id: 18, name: 'Vercel', icon: SiVercel, level: 92 },
      { id: 19, name: 'Docker', icon: SiDocker, level: 86 },
      { id: 20, name: 'GitHub Actions', icon: SiGithubactions, level: 93 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Testing',
    icon: FiTool,
    skills: [
      { id: 21, name: 'Figma', icon: SiFigma, level: 80 },
      { id: 22, name: 'Framer Motion', icon: SiFramer, level: 90 },
      { id: 23, name: 'Vite', icon: SiVite, level: 93 },
      { id: 24, name: "Postman", icon: SiPostman, level: 92 },
    ],
  },
  {
    id: 'data',
    label: 'Data & ML',
    icon: FiCpu,
    skills: [
      { id: 25, name: 'Python', icon: SiPython, level: 85 },
      { id: 26, name: 'Pandas', icon: SiPandas, level: 82 },
      { id: 27, name: 'NumPy', icon: SiNumpy, level: 80 },
      { id: 28, name: 'Scikit-learn', icon: SiScikitlearn, level: 78 },
      { id: 29, name: 'FastAPI', icon: SiFastapi, level: 80 },
    ],
  },
]

export const coreLanguages = [
  { id: 1, name: "Laravel", icon: SiLaravel },
  { id: 2, name: "Next.js", icon: SiNextdotjs },
  { id: 3, name: 'JavaScript', icon: SiJavascript },
  { id: 4, name: 'TypeScript', icon: SiTypescript },
  { id: 5, name: 'React', icon: SiReact },
  { id: 6, name: 'Node.js', icon: SiNodedotjs },
  { id: 7, name: 'Docker', icon: SiDocker },
]
