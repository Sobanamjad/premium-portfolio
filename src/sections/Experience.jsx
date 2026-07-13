import { motion } from 'framer-motion'
import { FiBriefcase, FiMapPin } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import GlassCard from '../components/GlassCard'
import { experience } from '../data/experience'

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Career Path"
          title="Where I've made an impact"
          subtitle="A timeline of the teams and products I've helped build, from early-career frontend work to leading platform engineering."
        />

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-[18px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet/60 via-cyan/40 to-transparent sm:-translate-x-1/2" />

          <div className="space-y-10">
            {experience.map((item, i) => {
              const alignRight = i % 2 === 1
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6 }}
                  className={`relative pl-12 sm:pl-0 sm:w-1/2 ${alignRight ? 'sm:ml-auto sm:pl-12' : 'sm:pr-12 sm:text-right'}`}
                >
                  <span
                    className={`absolute top-2 left-[10px] sm:left-auto w-3.5 h-3.5 rounded-full bg-gradient-to-br from-violet to-cyan ring-4 ring-void ${
                      alignRight ? 'sm:-left-[7px]' : 'sm:-right-[7px]'
                    }`}
                  />
                  <GlassCard className="p-6 inline-block w-full text-left">
                    <div className={`flex items-center gap-2 text-xs font-mono text-ink-muted mb-3 ${alignRight ? '' : 'sm:justify-end'}`}>
                      <span className="glass px-2.5 py-1 rounded-full">{item.period}</span>
                    </div>
                    <h3 className="font-display text-xl text-ink font-medium">{item.role}</h3>
                    <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-violet-soft mt-1 mb-3 ${alignRight ? '' : 'sm:justify-end'}`}>
                      <span className="flex items-center gap-1.5"><FiBriefcase /> {item.company}</span>
                      <span className="flex items-center gap-1.5 text-ink-muted"><FiMapPin /> {item.location}</span>
                    </div>
                    <p className="text-ink-muted text-sm leading-relaxed mb-4">{item.description}</p>
                    <div className={`flex flex-wrap gap-2 ${alignRight ? '' : 'sm:justify-end'}`}>
                      {item.tech.map((t) => (
                        <span key={t} className="font-mono text-[11px] text-ink-muted bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
