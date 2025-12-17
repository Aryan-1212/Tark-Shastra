import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import AncientParticleBackground from './components/AncientParticleBackground'
import Home from './pages/Home'
import TeamPage from './pages/TeamPage'

function App() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <Router>
      <div className="min-h-screen">
        <AncientParticleBackground />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

