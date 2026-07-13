import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import MagneticButton from '../components/MagneticButton'
import { projects, projectCategories } from '../data/projects'

const PAGE_SIZE = 6

export default function Projects() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category
      const matchesQuery =
        p.title.toLowerCase().includes(query.trim().toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(query.trim().toLowerCase()))
      return matchesCategory && matchesQuery
    })
  }, [category, query])

  const visibleProjects = filtered.slice(0, visible)

  const handleFilter = (cat) => {
    setCategory(cat)
    setVisible(PAGE_SIZE)
  }

  return (
    <section id="projects" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects I'm proud to have shipped"
          subtitle="A mix of client platforms, personal experiments, and open-source tools — filter by category or search by technology."
        />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                data-cursor="link"
                onClick={() => handleFilter(cat)}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                  category === cat ? 'text-void' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {category === cat && (
                  <motion.span
                    layoutId="project-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet to-cyan"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>

          <div className="glass flex items-center gap-2 rounded-full px-4 py-2.5 w-full sm:w-72">
            <FiSearch className="text-ink-muted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setVisible(PAGE_SIZE)
              }}
              placeholder="Search projects or tech..."
              className="bg-transparent outline-none text-sm text-ink placeholder:text-ink-faint w-full"
            />
          </div>
        </div>

        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-ink-muted py-16">
            No projects match your search.
          </p>
        )}

        {visible < filtered.length && (
          <div className="flex justify-center mt-14">
            <MagneticButton onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline">
              Load More Projects
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  )
}
