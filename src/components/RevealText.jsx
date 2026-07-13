import { motion } from 'framer-motion'

/**
 * Splits text into words and animates them upward into view on scroll,
 * staggered for a premium "text reveal" effect.
 */
export default function RevealText({ text, className = '', as: Component = 'span', delay = 0, wordDelay = 0.06 }) {
  const words = text.split(' ')

  return (
    <Component className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-top mr-[0.28em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: delay + i * wordDelay, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  )
}
