import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Site-wide custom cursor: a tight dot plus a lagging glow ring.
 * Grows and tints when hovering interactive elements (data-cursor="link").
 */
export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 }
  const glowX = useSpring(mouseX, springConfig)
  const glowY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleOver = (e) => {
      setIsPointer(Boolean(e.target.closest('[data-cursor="link"]')))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', handleOver)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', handleOver)
    }
  }, [mouseX, mouseY, isVisible])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null

  return (
    <div className={`pointer-events-none fixed inset-0 z-[100] hidden md:block transition-opacity ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Glow ring */}
      <motion.div
        className="fixed left-0 top-0 rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 64 : 36,
          height: isPointer ? 64 : 36,
          background: 'radial-gradient(circle, rgba(139,92,246,0.35), rgba(34,211,238,0.12) 60%, transparent 70%)',
          filter: 'blur(2px)',
          transition: 'width 0.25s ease, height 0.25s ease',
        }}
      />
      {/* Core dot */}
      <motion.div
        className="fixed left-0 top-0 rounded-full bg-white"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 10 : 7,
          height: isPointer ? 10 : 7,
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
    </div>
  )
}
