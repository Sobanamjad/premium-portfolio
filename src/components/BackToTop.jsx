import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUp } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import MagneticButton from './MagneticButton'

/** Floating back-to-top button that appears after scrolling past the hero. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40"
        >
          <MagneticButton
            onClick={scrollTop}
            aria-label="Back to top"
            className="glass-strong w-12 h-12 rounded-full flex items-center justify-center text-ink hover:text-violet-soft shadow-glow"
          >
            <FiArrowUp />
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
