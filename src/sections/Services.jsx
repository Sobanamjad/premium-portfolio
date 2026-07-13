import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import GlassCard from '../components/GlassCard'
import TiltCard from '../components/TiltCard'
import { services } from '../data/services'

export default function Services() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section id="services" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="What I Do"
          title="Services built around your product"
          subtitle="From first line of code to production infrastructure — flexible engagements tailored to where your product is today."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ id, icon: Icon, title, description, features }, i) => {
            const isOpen = expanded === id
            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              >
                <TiltCard maxTilt={6}>
                  <GlassCard
                    as="button"
                    onClick={() => setExpanded(isOpen ? null : id)}
                    className="p-7 text-left w-full h-full flex flex-col"
                    data-cursor="link"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet/20 to-cyan/20 flex items-center justify-center text-violet-soft text-xl mb-5">
                      <Icon />
                    </div>
                    <h3 className="font-display text-xl text-ink font-medium mb-2">{title}</h3>
                    <p className="text-ink-muted text-sm leading-relaxed">{description}</p>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden mt-4 space-y-2"
                        >
                          {features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm text-ink-muted">
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan" /> {f}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>

                    <div className="mt-auto pt-5 flex items-center gap-1.5 text-xs font-mono text-violet-soft">
                      {isOpen ? 'Show less' : 'Learn more'}
                      <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <FiChevronDown />
                      </motion.span>
                    </div>
                  </GlassCard>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
