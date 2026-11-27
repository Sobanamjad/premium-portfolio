import { Suspense, lazy, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import AuroraBackground from './components/AuroraBackground'
import Loader from './components/Loader'
import Hero from './sections/Hero'
import useLenis from './hooks/useLenis'

// Each section is its own lazy chunk — one slow section can't block others.
const About        = lazy(() => import('./sections/About'))
const Skills       = lazy(() => import('./sections/Skills'))
const Services     = lazy(() => import('./sections/Services'))
const Projects     = lazy(() => import('./sections/Projects'))
const Experience   = lazy(() => import('./sections/Experience'))
const Education    = lazy(() => import('./sections/Education'))
const Certificates = lazy(() => import('./sections/Certificates'))
const Testimonials = lazy(() => import('./sections/Testimonials'))
const Contact      = lazy(() => import('./sections/Contact'))
const Footer       = lazy(() => import('./sections/Footer'))

// Minimal height-preserving fallback so layout doesn't jump
function SectionFallback() {
  return <div className="h-[50vh]" aria-hidden />
}

export default function App() {
  const [loading, setLoading] = useState(true)
  useLenis()

  useEffect(() => {
    // One rAF is enough — avoids a flash on fast connections
    const id = requestAnimationFrame(() => setLoading(false))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>

      <AuroraBackground />
      <div className="noise" />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Hero is eagerly loaded — first paint is instant */}
        <Hero />

        {/* Every section is independently suspended so they load in parallel */}
        <Suspense fallback={<SectionFallback />}><About /></Suspense>
        <Suspense fallback={<SectionFallback />}><Skills /></Suspense>
        <Suspense fallback={<SectionFallback />}><Services /></Suspense>
        <Suspense fallback={<SectionFallback />}><Projects /></Suspense>
        <Suspense fallback={<SectionFallback />}><Experience /></Suspense>
        <Suspense fallback={<SectionFallback />}><Education /></Suspense>
        <Suspense fallback={<SectionFallback />}><Certificates /></Suspense>
        <Suspense fallback={<SectionFallback />}><Testimonials /></Suspense>
        <Suspense fallback={<SectionFallback />}><Contact /></Suspense>
        <Suspense fallback={<SectionFallback />}><Footer /></Suspense>
      </motion.main>

      <BackToTop />
    </>
  )
}
