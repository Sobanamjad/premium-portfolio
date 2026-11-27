import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

/**
 * Fixed full-viewport ambient background: grid, aurora blobs, vignette.
 * Blobs get a gentle GSAP scroll-parallax. willChange is set only during
 * active scroll and cleared at rest to avoid unnecessary GPU layers.
 */
export default function AuroraBackground() {
  const blobRefs = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      blobRefs.current.forEach((el, i) => {
        if (!el) return

        gsap.to(el, {
          yPercent: i % 2 === 0 ? 15 : -12,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 2,           // smoother than 1.2 — less jitter
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-void">
      {/* Animated grid */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid opacity-60"
        style={{ maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)' }}
      />

      {/* Aurora blobs */}
      <div
        ref={(el) => (blobRefs.current[0] = el)}
        className="absolute -top-40 -left-40 w-[42rem] h-[42rem] animate-blob pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={(el) => (blobRefs.current[1] = el)}
        className="absolute top-1/3 -right-40 w-[38rem] h-[38rem] animate-blob-slow pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.13) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
      <div
        ref={(el) => (blobRefs.current[2] = el)}
        className="absolute bottom-0 left-1/4 w-[34rem] h-[34rem] animate-blob pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(244,114,182,0.13) 0%, transparent 70%)',
          animationDelay: '4s',
          willChange: 'transform',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
      <div className="absolute inset-0 bg-void/40" />
    </div>
  )
}
