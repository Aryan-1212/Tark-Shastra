import { useEffect, useRef, useState } from 'react'

const ParticleSystem = () => {
  const canvasRef = useRef(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let particles = []

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Particle class
    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        // Start particles from below viewport, with extra height for mobile
        const isMobileDevice = canvas.width < 768
        const extraHeight = isMobileDevice ? canvas.height * 0.5 : canvas.height * 0.3
        this.y = canvas.height + Math.random() * extraHeight
        // Make particles larger on mobile for better visibility
        this.size = isMobileDevice 
          ? Math.random() * 4 + 2  // 2-6px on mobile
          : Math.random() * 3 + 1  // 1-4px on desktop
        this.speedY = Math.random() * 0.5 + 0.2
        this.speedX = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
        this.color = Math.random() > 0.5 ? '#D4AF37' : '#FF9933' // Gold or Saffron
        this.life = 1
        this.decay = Math.random() * 0.002 + 0.001
      }

      update() {
        this.y -= this.speedY
        this.x += this.speedX
        this.life -= this.decay
        this.opacity = this.life

        // Add slight flicker
        this.speedX += (Math.random() - 0.5) * 0.1

        // Reset when particle goes above viewport or life ends
        // Use larger threshold on mobile to ensure visibility
        const resetThreshold = canvas.width < 768 ? -50 : -10
        if (this.life <= 0 || this.y < resetThreshold) {
          this.reset()
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.restore()
      }
    }

    // Initialize particles - optimized for mobile visibility
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile 
      ? Math.min(30, Math.floor((canvas.width * canvas.height) / 25000))  // More particles on mobile
      : Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ 
        opacity: isMobile ? 0.8 : 0.6  // More visible on mobile
      }}
    />
  )
}

export default ParticleSystem

