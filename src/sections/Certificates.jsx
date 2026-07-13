import { motion } from 'framer-motion'
import { FiExternalLink, FiAward } from 'react-icons/fi'
import SectionHeading from '../components/SectionHeading'
import GlassCard from '../components/GlassCard'
import { certificates } from '../data/certificates'

export default function Certificates() {
  return (
    <section id="certificates" className="section-pad relative">
      <div className="container-max">
        <SectionHeading
          eyebrow="Certifications"
          title="Continued learning, verified"
          subtitle="Credentials I've earned to keep my cloud, frontend, and infrastructure skills current."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <img src={cert.image} alt={cert.title} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/90 to-transparent" />
                  <FiAward className="absolute top-3 right-3 text-gold text-xl" />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-display text-base text-ink font-medium leading-snug mb-1.5">{cert.title}</h3>
                  <p className="text-ink-muted text-sm mb-1">{cert.issuer}</p>
                  <span className="font-mono text-xs text-ink-faint mb-4">{cert.date}</span>
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="mt-auto inline-flex items-center gap-1.5 text-sm text-violet-soft hover:text-cyan transition-colors"
                  >
                    View Credential <FiExternalLink className="text-xs" />
                  </a>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
