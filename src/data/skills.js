import {
  FiCode, FiServer, FiDatabase, FiCloud, FiLayout, FiTool,
} from 'react-icons/fi'
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss, SiRedux,
  SiNodedotjs, SiExpress, SiPython, SiDjango, SiGraphql, SiNestjs,
  SiPostgresql, SiMongodb, SiRedis, SiMysql, SiFirebase, SiPrisma,
  SiDocker, SiKubernetes, SiVercel, SiGithubactions, SiTerraform,
  SiFigma, SiFramer, SiVite, SiWebpack, SiJest, SiCypress,
} from 'react-icons/si'

export const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: FiLayout,
    skills: [
      { id: 1, name: 'React', icon: SiReact, level: 96 },
      { id: 2, name: 'Next.js', icon: SiNextdotjs, level: 92 },
      { id: 3, name: 'TypeScript', icon: SiTypescript, level: 90 },
      { id: 4, name: 'JavaScript (ES6+)', icon: SiJavascript, level: 95 },
      { id: 5, name: 'Tailwind CSS', icon: SiTailwindcss, level: 94 },
      { id: 6, name: 'Redux Toolkit', icon: SiRedux, level: 85 },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: FiServer,
    skills: [
      { id: 7, name: 'Node.js', icon: SiNodedotjs, level: 93 },
      { id: 8, name: 'Express', icon: SiExpress, level: 90 },
      { id: 9, name: 'NestJS', icon: SiNestjs, level: 82 },
      { id: 10, name: 'Python', icon: SiPython, level: 80 },
      { id: 11, name: 'Django', icon: SiDjango, level: 75 },
      { id: 12, name: 'GraphQL', icon: SiGraphql, level: 84 },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    icon: FiDatabase,
    skills: [
      { id: 13, name: 'PostgreSQL', icon: SiPostgresql, level: 88 },
      { id: 14, name: 'MongoDB', icon: SiMongodb, level: 90 },
      { id: 15, name: 'Redis', icon: SiRedis, level: 78 },
      { id: 16, name: 'MySQL', icon: SiMysql, level: 82 },
      { id: 17, name: 'Firebase', icon: SiFirebase, level: 85 },
      { id: 18, name: 'Prisma', icon: SiPrisma, level: 87 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    icon: FiCloud,
    skills: [
      { id: 19, name: 'Docker', icon: SiDocker, level: 86 },
      { id: 20, name: 'Kubernetes', icon: SiKubernetes, level: 70 },
      { id: 21, name: 'AWS', icon: FiCloud, level: 82 },
      { id: 22, name: 'Vercel', icon: SiVercel, level: 92 },
      { id: 23, name: 'GitHub Actions', icon: SiGithubactions, level: 85 },
      { id: 24, name: 'Terraform', icon: SiTerraform, level: 68 },
    ],
  },
  {
    id: 'tools',
    label: 'Tools & Testing',
    icon: FiTool,
    skills: [
      { id: 25, name: 'Figma', icon: SiFigma, level: 80 },
      { id: 26, name: 'Framer Motion', icon: SiFramer, level: 90 },
      { id: 27, name: 'Vite', icon: SiVite, level: 93 },
      { id: 28, name: 'Webpack', icon: SiWebpack, level: 75 },
      { id: 29, name: 'Jest', icon: SiJest, level: 84 },
      { id: 30, name: 'Cypress', icon: SiCypress, level: 78 },
    ],
  },
]

export const coreLanguages = [
  { id: 1, name: 'JavaScript', icon: SiJavascript },
  { id: 2, name: 'TypeScript', icon: SiTypescript },
  { id: 3, name: 'Python', icon: SiPython },
  { id: 4, name: 'React', icon: SiReact },
  { id: 5, name: 'Node.js', icon: SiNodedotjs },
  { id: 6, name: 'Docker', icon: SiDocker },
]
