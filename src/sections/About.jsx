import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import GlassCard from '../components/GlassCard'
import AnimatedCounter from '../components/AnimatedCounter'
import MagneticButton from '../components/MagneticButton'
import { stats } from '../data/stats'

export default function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="About Me"
          title="Building products with craft and curiosity"
          subtitle="I'm a senior full-stack developer with 6+ years of experience turning ambitious ideas into fast, reliable, and beautifully-crafted software."
        />

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7 }}
            className="space-y-5 text-ink-muted text-base sm:text-lg leading-relaxed"
          >
            <p>
              My path into engineering started with a curiosity about why
              interfaces feel good to use — that question eventually pulled me
              into the entire stack, from database schema to motion design.
            </p>
            <p>
              Today I lead product engineering at{' '}
              <span className="text-ink font-medium">Nova Digital Labs</span>,
              where I help small teams ship ambitious products without
              sacrificing quality. I care deeply about performance,
              accessibility, and the small details that make software feel
              premium.
            </p>
            <p>
              Outside of client work, I maintain a couple of open-source
              libraries and mentor junior developers transitioning into
              full-stack roles.
            </p>

            <MagneticButton as="a" href="/resume.pdf" download className="btn-outline mt-4">
              <FiDownload /> Download CV
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-4 sm:gap-5"
          >
            {stats.map(({ id, icon: Icon, value, suffix, label }, i) => (
              <GlassCard key={id} className="p-6 sm:p-8" style={{ transitionDelay: `${i * 40}ms` }}>
                <Icon className="text-violet-soft text-2xl mb-4" />
                <div className="font-display text-3xl sm:text-4xl font-semibold text-ink">
                  <AnimatedCounter value={value} suffix={suffix} />
                </div>
                <p className="text-ink-muted text-sm mt-1">{label}</p>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
