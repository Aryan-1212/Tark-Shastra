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
        // Start particles from much further below viewport for better visibility
        const isMobileDevice = canvas.width < 768
        const extraHeight = isMobileDevice ? canvas.height * 1.5 : canvas.height * 1.0  // Much more height
        this.y = canvas.height + Math.random() * extraHeight
        // Spark dimensions – thin, elongated streaks instead of round dots
        this.length = isMobileDevice
          ? Math.random() * 22 + 8   // 8–30px on mobile
          : Math.random() * 18 + 6   // 6–24px on desktop
        this.thickness = isMobileDevice ? 1.2 : 1
        this.tilt = (Math.random() - 0.5) * 0.35 // subtle angle
        this.speedY = Math.random() * 0.8 + 0.3  // Faster movement
        this.speedX = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.7 + 0.4  // More visible sparks
        // Deep ember / fire colors, distinct from text gold
        const emberPalette = ['#CC6A2B', '#B1531B', '#E07A3F', '#8F3B20']
        this.color = emberPalette[Math.floor(Math.random() * emberPalette.length)]
        this.life = 1
        this.decay = Math.random() * 0.002 + 0.001
      }

      update() {
        this.y -= this.speedY
        this.x += this.speedX
        this.life -= this.decay
        this.opacity = this.life

        // Add slight horizontal dance
        this.speedX += (Math.random() - 0.5) * 0.08

        // Reset when particle goes above viewport or life ends
        // Use larger threshold to keep more sparks visible longer
        const resetThreshold = canvas.width < 768 ? -80 : -30
        if (this.life <= 0 || this.y < resetThreshold) {
          this.reset()
        }
      }

      draw() {
        ctx.save()
        ctx.globalAlpha = this.opacity

        // Draw a tapered, glowing streak to mimic real fire sparks
        const gradient = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x,
          this.y - this.length
        )
        gradient.addColorStop(0, 'rgba(0,0,0,0)')
        gradient.addColorStop(0.2, `${this.color}55`)
        gradient.addColorStop(0.6, `${this.color}AA`)
        gradient.addColorStop(1, `${this.color}FF`)

        ctx.translate(this.x, this.y)
        ctx.rotate(-Math.PI / 2 + this.tilt)

        ctx.shadowBlur = 14
        ctx.shadowColor = this.color
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(this.length, -this.thickness * 0.4)
        ctx.lineTo(this.length * 0.4, this.thickness * 0.7)
        ctx.lineTo(0, this.thickness)
        ctx.closePath()
        ctx.fill()

        ctx.restore()
      }
    }

    // Initialize particles - significantly increased for more visible sparks
    const isMobile = window.innerWidth < 768
    const particleCount = isMobile 
      ? Math.min(150, Math.floor((canvas.width * canvas.height) / 8000))  // More sparks on mobile
      : Math.min(250, Math.floor((canvas.width * canvas.height) / 6000))  // More sparks on desktop
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
        opacity: isMobile ? 0.95 : 0.75  // Increased visibility for sparks
      }}
    />
  )
}

export default ParticleSystem

