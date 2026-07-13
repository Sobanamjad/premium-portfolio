import { motion } from 'framer-motion'
import { socialLinks } from '../data/socialLinks'
import { navLinks } from '../data/navLinks'
import MagneticButton from '../components/MagneticButton'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/[0.06] px-6 sm:px-10 lg:px-20 py-14">
      <div className="container-max flex flex-col items-center gap-8 text-center">
        <a href="#home" className="font-display text-2xl font-semibold tracking-tight text-ink">
          Alex<span className="gradient-text">.dev</span>
        </a>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-sm text-ink-muted hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ id, icon: Icon, url, name }, i) => (
            <MagneticButton
              key={id}
              as="a"
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
              className="glass w-11 h-11 rounded-full flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
            >
              <motion.span
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                className="flex"
              >
                <Icon className="text-lg" />
              </motion.span>
            </MagneticButton>
          ))}
        </div>

        <p className="text-ink-faint text-xs font-mono">
          © {year} Alex Rivera. Built with React, Tailwind CSS & Framer Motion.
        </p>
      </div>
    </footer>
  )
}
