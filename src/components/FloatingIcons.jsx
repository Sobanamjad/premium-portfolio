import { motion } from 'framer-motion'

/**
 * Decorative floating tech icons scattered around a container (e.g. the hero).
 * @param {{icon: React.ComponentType, className: string, delay?: number}[]} items
 */
export default function FloatingIcons({ items = [] }) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden>
      {items.map(({ icon: Icon, className, delay = 0 }, i) => (
        <motion.div
          key={i}
          className={`absolute glass rounded-2xl p-3 sm:p-4 text-ink-muted ${className}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -16, 0] }}
          transition={{
            opacity: { duration: 0.6, delay },
            scale: { duration: 0.6, delay },
            y: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay },
          }}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.div>
      ))}
    </div>
  )
}
