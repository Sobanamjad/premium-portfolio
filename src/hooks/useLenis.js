import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Initializes Lenis smooth-scrolling for the whole document. */
export default function useLenis() {
  // Disabled Lenis completely to enforce native, instant scrolling.
  return undefined
}
