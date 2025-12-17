import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Tracks from '../components/Tracks'
import WhatYouGet from '../components/WhatYouGet'
import Schedule from '../components/Schedule'
import Sponsors from '../components/Sponsors'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import ParticleSystem from '../components/ParticleSystem'

// Lazy load heavy components
const TeamPreview = lazy(() => import('../components/TeamPreview'))

function Home() {
  return (
    <div className="relative min-h-screen">
      <ParticleSystem />
      <div className="relative z-10">
        <Hero />
        <About />
        <Tracks />
        <WhatYouGet />
        <Schedule />
        <Suspense fallback={<div className="h-96" />}>
          <TeamPreview />
        </Suspense>
        <Sponsors />
        <FAQ />
        <Footer />
      </div>
    </div>
  )
}

export default Home

