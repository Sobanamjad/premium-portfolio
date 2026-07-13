import { motion } from 'framer-motion'

/**
 * Base glassmorphism card with an optional lift-on-hover interaction.
 * Compose with `className` for layout; children render inside padded content.
 */
export default function GlassCard({ children, className = '', hover = true, as: Component = motion.div, ...props }) {
  return (
    <Component
      className={`glass gradient-border rounded-2xl ${hover ? 'transition-transform duration-300 hover:-translate-y-1.5' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
