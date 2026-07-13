import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import GlassCard from '../components/GlassCard'
import Marquee from '../components/Marquee'
import { skillCategories, coreLanguages } from '../data/skills'

function SkillBar({ level, delay = 0 }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-violet to-cyan"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id)
  const [query, setQuery] = useState('')

  const activeSkills = useMemo(() => {
    const category = skillCategories.find((c) => c.id === activeCategory)
    if (!category) return []
    return category.skills.filter((s) =>
      s.name.toLowerCase().includes(query.trim().toLowerCase())
    )
  }, [activeCategory, query])

  return (
    <section id="skills" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Skills & Tools"
          title="A toolkit refined over 6 years"
          subtitle="Technologies I reach for daily, grouped by where they sit in the stack. Search or filter by category to explore."
        />

        {/* Marquee of core languages */}
        <div className="mb-16">
          <Marquee>
            {coreLanguages.map(({ id, name, icon: Icon }) => (
              <div key={id} className="glass flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm text-ink-muted whitespace-nowrap">
                <Icon className="text-violet-soft" /> {name}
              </div>
            ))}
          </Marquee>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                data-cursor="link"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                  activeCategory === cat.id ? 'text-void' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.span
                    layoutId="skills-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-violet to-cyan"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <cat.icon className="relative z-10" />
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="glass flex items-center gap-2 rounded-full px-4 py-2.5 w-full sm:w-64">
            <FiSearch className="text-ink-muted shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a skill..."
              className="bg-transparent outline-none text-sm text-ink placeholder:text-ink-faint w-full"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {activeSkills.map((skill, i) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
              >
                <GlassCard className="p-5 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-violet-soft text-lg shrink-0">
                      <skill.icon />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-ink font-medium truncate">{skill.name}</p>
                    </div>
                    <span className="font-mono text-xs text-ink-muted">{skill.level}%</span>
                  </div>
                  <SkillBar level={skill.level} delay={i * 0.04} />
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>

          {activeSkills.length === 0 && (
            <p className="col-span-full text-center text-ink-muted py-10">
              No skills match "{query}".
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
