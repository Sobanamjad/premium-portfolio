import useCountUp from '../hooks/useCountUp'

/** Number that animates from 0 up to `value` once scrolled into view. */
export default function AnimatedCounter({ value, suffix = '', duration = 1800, className = '' }) {
  const { ref, value: current } = useCountUp(value, duration)
  return (
    <span ref={ref} className={className}>
      {current}
      {suffix}
    </span>
  )
}
