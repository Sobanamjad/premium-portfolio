import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/** Animates a number counting up from 0 to `end` once the element scrolls into view. */
export default function useCountUp(end = 0, duration = 1800) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return undefined
    let start = null
    let frame

    const step = (timestamp) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * end))
      if (progress < 1) frame = requestAnimationFrame(step)
      else setValue(end)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [inView, end, duration])

  return { ref, value }
}
