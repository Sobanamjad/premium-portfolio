import { motion } from 'framer-motion'
import { FiArrowDown, FiDownload, FiMail, FiCloud } from 'react-icons/fi'
import { SiReact, SiNodedotjs, SiTypescript, SiDocker } from 'react-icons/si'
import useTypingEffect from '../hooks/useTypingEffect'
import { roles } from '../data/roles'
import { socialLinks } from '../data/socialLinks'
import MagneticButton from '../components/MagneticButton'
import FloatingIcons from '../components/FloatingIcons'

const floatingItems = [
  { icon: SiReact, className: 'top-[14%] left-[6%] sm:left-[10%]', delay: 0.6 },
  { icon: SiNodedotjs, className: 'top-[28%] right-[6%] sm:right-[12%]', delay: 0.8 },
  { icon: SiTypescript, className: 'bottom-[30%] left-[4%] sm:left-[8%]', delay: 1.0 },
  { icon: SiDocker, className: 'bottom-[16%] right-[8%] sm:right-[14%]', delay: 1.2 },
  { icon: FiCloud, className: 'top-[52%] left-[2%] sm:left-[4%]', delay: 1.4 },
]

export default function Hero() {
  const typed = useTypingEffect(roles, { typingSpeed: 70, deletingSpeed: 35, pause: 1500 })

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 sm:px-10 pt-28 pb-16 overflow-hidden">
      <FloatingIcons items={floatingItems} />

      <div className="container-max relative z-10 flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs sm:text-sm text-ink-muted font-mono">Available for new projects</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95]"
        >
          Hi, I'm <span className="gradient-text">Soban Amjad</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="h-9 sm:h-10 flex items-center"
        >
          <p className="font-mono text-lg sm:text-2xl text-ink-muted">
            {typed}
            <span className="inline-block w-[2px] h-5 sm:h-6 bg-violet-soft ml-1 -mb-1 animate-pulse" />
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="max-w-xl text-ink-muted text-base sm:text-lg leading-relaxed"
        >
          I design and build fast, accessible, and visually refined products —
          from database schema to the pixel on screen. Currently crafting
          scalable web platforms at Nova Digital Labs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <MagneticButton as="a" href="/resume.pdf" download className="btn-glow">
            <FiDownload /> Download Resume
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-outline"
          >
            <FiMail /> Get In Touch
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="flex items-center gap-4 mt-4"
        >
          {socialLinks.slice(0, 4).map(({ id, icon: Icon, url, name }) => (
            <MagneticButton
              key={id}
              as="a"
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="glass w-11 h-11 rounded-full flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
            >
              <Icon className="text-lg" />
            </MagneticButton>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-muted hover:text-ink transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to about section"
      >
        <FiArrowDown size={22} />
      </motion.a>
    </section>
  )
}
