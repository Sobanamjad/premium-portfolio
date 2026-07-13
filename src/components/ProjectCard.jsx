import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiStar } from 'react-icons/fi'
import TiltCard from './TiltCard'

const statusStyles = {
  Live: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/30',
  'In Progress': 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  Maintained: 'bg-sky-400/15 text-sky-300 border-sky-400/30',
}

export default function ProjectCard({ project, index = 0 }) {
  const { title, description, tech, github, live, image, category, status, featured } = project

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
    >
      <TiltCard maxTilt={7}>
        <div className="gradient-border rounded-2xl overflow-hidden glass group">
          <div className="relative overflow-hidden aspect-[16/10]">
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

            {/* Top badges */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              {featured && (
                <span className="flex items-center gap-1 bg-gradient-to-r from-gold to-amber-500 text-void text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  <FiStar className="text-xs" /> Featured
                </span>
              )}
              <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${statusStyles[status] || 'bg-white/10 text-ink-muted border-white/15'}`}>
                {status}
              </span>
            </div>
            <span className="absolute top-4 right-4 font-mono text-[11px] text-ink-muted glass px-2.5 py-1 rounded-full">
              {category}
            </span>

            {/* Hover overlay actions */}
            <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href={live}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                aria-label={`Live demo of ${title}`}
                className="glass-strong w-12 h-12 rounded-full flex items-center justify-center text-ink hover:text-violet-soft hover:scale-110 transition-transform"
              >
                <FiExternalLink />
              </a>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                data-cursor="link"
                aria-label={`GitHub repository for ${title}`}
                className="glass-strong w-12 h-12 rounded-full flex items-center justify-center text-ink hover:text-violet-soft hover:scale-110 transition-transform"
              >
                <FiGithub />
              </a>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-display text-lg text-ink font-medium mb-1.5">{title}</h3>
            <p className="text-ink-muted text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>
            <div className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <span key={t} className="font-mono text-[11px] text-ink-muted bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}
