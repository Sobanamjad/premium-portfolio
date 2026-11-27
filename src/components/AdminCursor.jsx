import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Simple cursor for admin panel - clean and minimal
 */
export default function AdminCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 300, mass: 0.3 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleOver = (e) => {
      setIsPointer(
        e.target.tagName === 'BUTTON' ||
        e.target.tagName === 'A' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.closest('[role="button"]')
      )
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
      <motion.div
        className="fixed left-0 top-0 rounded-full border-2 border-gray-900 bg-gray-900/5"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
      <motion.div
        className="fixed left-0 top-0 rounded-full bg-gray-900"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 6 : 4,
          height: isPointer ? 6 : 4,
          transition: 'width 0.2s ease, height 0.2s ease',
        }}
      />
    </div>
  )
}
