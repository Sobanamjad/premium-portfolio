import { motion, useScroll, useSpring } from 'framer-motion'

/** Thin gradient bar fixed to the top of the viewport, tracking scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[90] bg-gradient-to-r from-violet via-pink to-cyan"
      style={{ scaleX }}
    />
  )
}
