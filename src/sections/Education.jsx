import { motion } from 'framer-motion'
import { FiBookOpen } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import GlassCard from '../components/GlassCard'
import { education } from '../data/experience'

export default function Education() {
  return (
    <section id="education" className="section-pad relative">
      <div className="container-max">
        <SectionHeading eyebrow="Education" title="Academic & training background" />

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {education.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <GlassCard className="p-7 h-full">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet/20 to-cyan/20 flex items-center justify-center text-violet-soft text-lg mb-5">
                  <FiBookOpen />
                </div>
                <span className="font-mono text-xs text-ink-muted">{item.period}</span>
                <h3 className="font-display text-lg text-ink font-medium mt-1.5">{item.degree}</h3>
                <p className="text-violet-soft text-sm mt-1 mb-3">{item.institution}</p>
                <p className="text-ink-muted text-sm leading-relaxed">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
