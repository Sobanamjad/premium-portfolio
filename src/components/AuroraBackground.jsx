import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fixed, full-viewport ambient background: animated grid, aurora blobs, and a
 * subtle cursor-reactive glow. Rendered once at the App root, behind everything.
 *
 * The blobs get a slow GSAP ScrollTrigger-driven parallax (each moving at a
 * different rate) layered on top of their CSS drift animation — GSAP's scrub
 * timeline gives smoother continuous scroll-linked motion than a JS scroll
 * listener would here.
 */
export default function AuroraBackground() {
  const blobRefs = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const ctx = gsap.context(() => {
      blobRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.to(el, {
          yPercent: i % 2 === 0 ? 18 : -14,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
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

      {/* Aurora blobs (CSS drift + GSAP scroll parallax) */}
      <div
        ref={(el) => (blobRefs.current[0] = el)}
        className="absolute -top-40 -left-40 w-[42rem] h-[42rem] animate-blob pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)', willChange: 'transform' }}
      />
      <div
        ref={(el) => (blobRefs.current[1] = el)}
        className="absolute top-1/3 -right-40 w-[38rem] h-[38rem] animate-blob-slow pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)', willChange: 'transform' }}
      />
      <div
        ref={(el) => (blobRefs.current[2] = el)}
        className="absolute bottom-0 left-1/4 w-[34rem] h-[34rem] animate-blob pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(244, 114, 182, 0.15) 0%, transparent 70%)', animationDelay: '4s', willChange: 'transform' }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void" />
      <div className="absolute inset-0 bg-void/40" />
    </div>
  )
}
