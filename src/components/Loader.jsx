import { motion } from 'framer-motion'

/** Full-screen loading splash shown briefly on first mount. */
export default function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-void flex flex-col items-center justify-center gap-4"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
    >
      <motion.span
        className="font-display text-2xl sm:text-3xl gradient-text font-semibold tracking-tight"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Alex Rivera
      </motion.span>
      <div className="w-40 h-[3px] rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-violet via-pink to-cyan"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  )
}
