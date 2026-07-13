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

// Below-the-fold sections are code-split so the hero paints as fast as possible.
const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Services = lazy(() => import('./sections/Services'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Education = lazy(() => import('./sections/Education'))
const Certificates = lazy(() => import('./sections/Certificates'))
const Testimonials = lazy(() => import('./sections/Testimonials'))
const Contact = lazy(() => import('./sections/Contact'))
const Footer = lazy(() => import('./sections/Footer'))

function SectionFallback() {
  return <div className="h-[40vh] flex items-center justify-center text-ink-faint text-sm font-mono">Loading…</div>
}

export default function App() {
  const [loading, setLoading] = useState(true)
  useLenis()

  useEffect(() => {
    setLoading(false)
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
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Skills />
          <Services />
          <Projects />
          <Experience />
          <Education />
          <Certificates />
          <Testimonials />
          <Contact />
          <Footer />
        </Suspense>
      </motion.main>

      <BackToTop />
    </>
  )
}
