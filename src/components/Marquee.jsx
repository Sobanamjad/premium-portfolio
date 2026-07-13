/**
 * Infinite horizontal marquee. Duplicates children once so the CSS
 * translateX(-50%) loop is seamless.
 */
export default function Marquee({ children, reverse = false, speedClass = 'animate-marquee' }) {
  const animation = reverse ? 'animate-marquee-reverse' : speedClass

  return (
    <div className="overflow-hidden relative [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex w-max gap-6 ${animation}`}>
        <div className="flex gap-6 shrink-0">{children}</div>
        <div className="flex gap-6 shrink-0" aria-hidden>{children}</div>
      </div>
    </div>
  )
}
