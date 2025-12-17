import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARTICLE_COUNT = 18000
// Slightly deeper, less "UI gold" palette to avoid clashing with text
const PALETTE = [0xC2641F, 0xA54B1A, 0x8C3A13, 0xE07A3F]

const createGlowTexture = () => {
  const size = 96
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  )
  gradient.addColorStop(0, 'rgba(255, 210, 160, 0.96)')
  gradient.addColorStop(0.4, 'rgba(229, 141, 65, 0.7)')
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

const isPointInShape = (point, shapePoints) => {
  let inside = false
  const x = point.x
  const y = point.y

  for (let i = 0, j = shapePoints.length - 1; i < shapePoints.length; j = i++) {
    const xi = shapePoints[i].x
    const yi = shapePoints[i].y
    const xj = shapePoints[j].x
    const yj = shapePoints[j].y

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}

const fillFromShape = (shape, { scale = 1.8, yOffset = 0, particleCount = PARTICLE_COUNT }) => {
  const edgePoints = shape.getSpacedPoints(2500).map((p) => ({
    x: p.x * scale,
    y: (p.y + yOffset) * scale,
  }))

  const points = shape.getPoints()
  let minX = Infinity, maxX = -Infinity
  let minY = Infinity, maxY = -Infinity
  
  points.forEach((p) => {
    minX = Math.min(minX, p.x)
    maxX = Math.max(maxX, p.x)
    minY = Math.min(minY, p.y)
    maxY = Math.max(maxY, p.y)
  })
  
  minX = minX * scale
  maxX = maxX * scale
  minY = (minY + yOffset) * scale
  maxY = (maxY + yOffset) * scale

  const positions = new Float32Array(particleCount * 3)
  const temp = new THREE.Vector2()
  const edgeQuota = Math.floor(particleCount * 0.25)

  let i = 0
  while (i < edgeQuota) {
    const p = edgePoints[i % edgePoints.length]
    const jitter = 0.5
    positions[i * 3] = p.x + (Math.random() - 0.5) * jitter
    positions[i * 3 + 1] = p.y + (Math.random() - 0.5) * jitter
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8
    i += 1
  }

  while (i < particleCount) {
    const x = THREE.MathUtils.lerp(minX, maxX, Math.random())
    const y = THREE.MathUtils.lerp(minY, maxY, Math.random())
    temp.set(x / scale, (y / scale) - yOffset)
    if (isPointInShape(temp, points)) {
      positions[i * 3] = x + (Math.random() - 0.5) * 0.2
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8
      i += 1
    }
  }

  return positions
}

const makeSphere = (particleCount = PARTICLE_COUNT) => {
  const positions = new Float32Array(particleCount * 3)
  const radius = 55
  const offset = 2.399963229728653

  for (let i = 0; i < particleCount; i += 1) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = offset * i
    const spread = radius * (0.94 + Math.random() * 0.06)
    positions[i * 3] = spread * r * Math.cos(theta)
    positions[i * 3 + 1] = spread * y
    positions[i * 3 + 2] = spread * r * Math.sin(theta)
  }

  return positions
}

// South Indian Temple (Gopuram style) - Similar to image 2
const makeTemple = (particleCount = PARTICLE_COUNT) => {
  const s = new THREE.Shape()
  
  // Wide base - 3 tiers
  s.moveTo(-45, -40)
  s.lineTo(45, -40)
  s.lineTo(45, -35)
  s.lineTo(-45, -35)
  s.closePath()
  
  s.moveTo(-42, -35)
  s.lineTo(42, -35)
  s.lineTo(42, -30)
  s.lineTo(-42, -30)
  s.closePath()
  
  s.moveTo(-40, -30)
  s.lineTo(40, -30)
  s.lineTo(40, -25)
  s.lineTo(-40, -25)
  s.closePath()
  
  // Main tower body - tapering pyramid
  s.moveTo(-38, -25)
  s.lineTo(38, -25)
  s.lineTo(36, -18)
  s.lineTo(-36, -18)
  s.closePath()
  
  s.moveTo(-34, -18)
  s.lineTo(34, -18)
  s.lineTo(32, -11)
  s.lineTo(-32, -11)
  s.closePath()
  
  s.moveTo(-30, -11)
  s.lineTo(30, -11)
  s.lineTo(28, -4)
  s.lineTo(-28, -4)
  s.closePath()
  
  s.moveTo(-26, -4)
  s.lineTo(26, -4)
  s.lineTo(24, 3)
  s.lineTo(-24, 3)
  s.closePath()
  
  s.moveTo(-22, 3)
  s.lineTo(22, 3)
  s.lineTo(20, 10)
  s.lineTo(-20, 10)
  s.closePath()
  
  s.moveTo(-18, 10)
  s.lineTo(18, 10)
  s.lineTo(16, 17)
  s.lineTo(-16, 17)
  s.closePath()
  
  s.moveTo(-14, 17)
  s.lineTo(14, 17)
  s.lineTo(12, 24)
  s.lineTo(-12, 24)
  s.closePath()
  
  s.moveTo(-10, 24)
  s.lineTo(10, 24)
  s.lineTo(8, 31)
  s.lineTo(-8, 31)
  s.closePath()
  
  // Dome top
  s.moveTo(-8, 31)
  s.lineTo(8, 31)
  s.quadraticCurveTo(10, 35, 6, 38)
  s.lineTo(4, 40)
  s.lineTo(-4, 40)
  s.lineTo(-6, 38)
  s.quadraticCurveTo(-10, 35, -8, 31)
  s.closePath()
  
  // Kalasha
  s.moveTo(-3, 40)
  s.lineTo(3, 40)
  s.lineTo(2, 43)
  s.lineTo(-2, 43)
  s.closePath()

  return fillFromShape(s, { scale: 1.6, yOffset: 0, particleCount: PARTICLE_COUNT })
}

// Havan Kund / Yagna Fire - Similar to image 1
const makeHavanKund = (particleCount = PARTICLE_COUNT) => {
  const s = new THREE.Shape()
  
  // Three tier platform base
  s.moveTo(-42, -40)
  s.lineTo(42, -40)
  s.lineTo(40, -35)
  s.lineTo(-40, -35)
  s.closePath()
  
  s.moveTo(-38, -35)
  s.lineTo(38, -35)
  s.lineTo(36, -30)
  s.lineTo(-36, -30)
  s.closePath()
  
  s.moveTo(-34, -30)
  s.lineTo(34, -30)
  s.lineTo(32, -25)
  s.lineTo(-32, -25)
  s.closePath()
  
  // Kund (fire pit) base
  s.moveTo(-28, -25)
  s.lineTo(28, -25)
  s.lineTo(24, -18)
  s.lineTo(-24, -18)
  s.closePath()
  
  s.moveTo(-22, -18)
  s.lineTo(22, -18)
  s.lineTo(20, -12)
  s.lineTo(-20, -12)
  s.closePath()
  
  // Main flame body - tall and layered
  s.moveTo(-18, -12)
  s.lineTo(-15, -8)
  s.lineTo(-12, -5)
  s.lineTo(-10, 0)
  s.lineTo(-8, 6)
  s.lineTo(-6, 12)
  s.lineTo(-5, 18)
  s.lineTo(-3, 24)
  s.lineTo(-2, 30)
  s.lineTo(0, 38)
  s.lineTo(2, 30)
  s.lineTo(3, 24)
  s.lineTo(5, 18)
  s.lineTo(6, 12)
  s.lineTo(8, 6)
  s.lineTo(10, 0)
  s.lineTo(12, -5)
  s.lineTo(15, -8)
  s.lineTo(18, -12)
  s.closePath()
  
  // Left flame lick
  s.moveTo(-8, 8)
  s.lineTo(-10, 14)
  s.lineTo(-12, 20)
  s.lineTo(-13, 26)
  s.lineTo(-12, 30)
  s.lineTo(-9, 28)
  s.lineTo(-7, 22)
  s.lineTo(-6, 16)
  s.lineTo(-5, 10)
  s.closePath()
  
  // Right flame lick
  s.moveTo(8, 8)
  s.lineTo(10, 14)
  s.lineTo(12, 20)
  s.lineTo(13, 26)
  s.lineTo(12, 30)
  s.lineTo(9, 28)
  s.lineTo(7, 22)
  s.lineTo(6, 16)
  s.lineTo(5, 10)
  s.closePath()
  
  // Inner flame core
  s.moveTo(-6, -8)
  s.lineTo(-4, 0)
  s.lineTo(-3, 8)
  s.lineTo(-2, 16)
  s.lineTo(-1, 24)
  s.lineTo(0, 32)
  s.lineTo(1, 24)
  s.lineTo(2, 16)
  s.lineTo(3, 8)
  s.lineTo(4, 0)
  s.lineTo(6, -8)
  s.closePath()

  return fillFromShape(s, { scale: 1.7, yOffset: 0, particleCount })
}

// Traditional Diya - Similar to image 3
const makeDiya = (particleCount = PARTICLE_COUNT) => {
  const s = new THREE.Shape()
  
  // Flame - teardrop shape
  s.moveTo(0, 32)
  s.quadraticCurveTo(6, 28, 8, 20)
  s.quadraticCurveTo(9, 12, 8, 6)
  s.quadraticCurveTo(6, 0, 4, -4)
  s.quadraticCurveTo(2, -6, 0, -7)
  s.quadraticCurveTo(-2, -6, -4, -4)
  s.quadraticCurveTo(-6, 0, -8, 6)
  s.quadraticCurveTo(-9, 12, -8, 20)
  s.quadraticCurveTo(-6, 28, 0, 32)
  s.closePath()
  
  // Inner flame glow
  s.moveTo(0, 26)
  s.quadraticCurveTo(4, 23, 5, 16)
  s.quadraticCurveTo(5, 10, 4, 4)
  s.quadraticCurveTo(2, 0, 0, -2)
  s.quadraticCurveTo(-2, 0, -4, 4)
  s.quadraticCurveTo(-5, 10, -5, 16)
  s.quadraticCurveTo(-4, 23, 0, 26)
  s.closePath()
  
  // Wick holder
  s.moveTo(-6, -7)
  s.lineTo(6, -7)
  s.lineTo(7, -10)
  s.lineTo(-7, -10)
  s.closePath()
  
  // Left bowl half - wide and rounded
  s.moveTo(-30, -10)
  s.quadraticCurveTo(-35, -12, -38, -16)
  s.quadraticCurveTo(-40, -20, -38, -24)
  s.quadraticCurveTo(-35, -28, -28, -30)
  s.lineTo(-8, -32)
  s.lineTo(-8, -10)
  s.closePath()
  
  // Right bowl half
  s.moveTo(30, -10)
  s.quadraticCurveTo(35, -12, 38, -16)
  s.quadraticCurveTo(40, -20, 38, -24)
  s.quadraticCurveTo(35, -28, 28, -30)
  s.lineTo(8, -32)
  s.lineTo(8, -10)
  s.closePath()
  
  // Center bowl
  s.moveTo(-8, -10)
  s.lineTo(8, -10)
  s.lineTo(8, -32)
  s.lineTo(-8, -32)
  s.closePath()
  
  // Bowl base - decorative edge
  s.moveTo(-28, -30)
  s.quadraticCurveTo(-20, -34, -10, -36)
  s.lineTo(10, -36)
  s.quadraticCurveTo(20, -34, 28, -30)
  s.lineTo(28, -32)
  s.quadraticCurveTo(18, -36, 0, -38)
  s.quadraticCurveTo(-18, -36, -28, -32)
  s.closePath()
  
  // Left spout (extended)
  s.moveTo(-30, -18)
  s.quadraticCurveTo(-36, -16, -42, -12)
  s.quadraticCurveTo(-45, -8, -43, -4)
  s.quadraticCurveTo(-40, -6, -35, -8)
  s.quadraticCurveTo(-32, -12, -30, -18)
  s.closePath()
  
  // Right spout (extended)
  s.moveTo(30, -18)
  s.quadraticCurveTo(36, -16, 42, -12)
  s.quadraticCurveTo(45, -8, 43, -4)
  s.quadraticCurveTo(40, -6, 35, -8)
  s.quadraticCurveTo(32, -12, 30, -18)
  s.closePath()

  return fillFromShape(s, { scale: 1.5, yOffset: 5, particleCount })
}

// Lotus Flower
const makeLotus = (particleCount = PARTICLE_COUNT) => {
  const s = new THREE.Shape()
  
  // Center main petal
  s.moveTo(0, 35)
  s.quadraticCurveTo(6, 30, 8, 20)
  s.quadraticCurveTo(10, 8, 8, -4)
  s.quadraticCurveTo(6, -12, 0, -18)
  s.quadraticCurveTo(-6, -12, -8, -4)
  s.quadraticCurveTo(-10, 8, -8, 20)
  s.quadraticCurveTo(-6, 30, 0, 35)
  s.closePath()
  
  // Top left petal
  s.moveTo(-8, 20)
  s.quadraticCurveTo(-16, 24, -22, 28)
  s.quadraticCurveTo(-28, 30, -32, 26)
  s.quadraticCurveTo(-34, 20, -30, 14)
  s.quadraticCurveTo(-24, 10, -16, 12)
  s.quadraticCurveTo(-10, 14, -8, 20)
  s.closePath()
  
  // Top right petal
  s.moveTo(8, 20)
  s.quadraticCurveTo(16, 24, 22, 28)
  s.quadraticCurveTo(28, 30, 32, 26)
  s.quadraticCurveTo(34, 20, 30, 14)
  s.quadraticCurveTo(24, 10, 16, 12)
  s.quadraticCurveTo(10, 14, 8, 20)
  s.closePath()
  
  // Left petal
  s.moveTo(-8, 0)
  s.quadraticCurveTo(-18, 2, -26, 6)
  s.quadraticCurveTo(-34, 10, -38, 6)
  s.quadraticCurveTo(-40, 0, -36, -6)
  s.quadraticCurveTo(-28, -10, -18, -8)
  s.quadraticCurveTo(-10, -6, -8, 0)
  s.closePath()
  
  // Right petal
  s.moveTo(8, 0)
  s.quadraticCurveTo(18, 2, 26, 6)
  s.quadraticCurveTo(34, 10, 38, 6)
  s.quadraticCurveTo(40, 0, 36, -6)
  s.quadraticCurveTo(28, -10, 18, -8)
  s.quadraticCurveTo(10, -6, 8, 0)
  s.closePath()
  
  // Bottom left petal
  s.moveTo(-8, -10)
  s.quadraticCurveTo(-16, -12, -24, -14)
  s.quadraticCurveTo(-32, -16, -34, -22)
  s.quadraticCurveTo(-32, -28, -26, -30)
  s.quadraticCurveTo(-18, -28, -12, -22)
  s.quadraticCurveTo(-8, -16, -8, -10)
  s.closePath()
  
  // Bottom right petal
  s.moveTo(8, -10)
  s.quadraticCurveTo(16, -12, 24, -14)
  s.quadraticCurveTo(32, -16, 34, -22)
  s.quadraticCurveTo(32, -28, 26, -30)
  s.quadraticCurveTo(18, -28, 12, -22)
  s.quadraticCurveTo(8, -16, 8, -10)
  s.closePath()
  
  // Bottom center petal
  s.moveTo(0, -18)
  s.quadraticCurveTo(4, -24, 8, -32)
  s.quadraticCurveTo(6, -38, 0, -40)
  s.quadraticCurveTo(-6, -38, -8, -32)
  s.quadraticCurveTo(-4, -24, 0, -18)
  s.closePath()

  return fillFromShape(s, { scale: 1.6, yOffset: 0, particleCount })
}

const AncientParticleBackground = () => {
  const containerRef = useRef(null)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    // Mobile-optimized settings
    const mobileOptimized = isMobile
    const particleCount = mobileOptimized ? Math.floor(PARTICLE_COUNT * 0.6) : PARTICLE_COUNT

    const renderer = new THREE.WebGLRenderer({ 
      antialias: !mobileOptimized, // Disable antialiasing on mobile for performance
      alpha: true,
      powerPreference: mobileOptimized ? 'low-power' : 'high-performance'
    })
    renderer.setPixelRatio(mobileOptimized ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    const canvas = renderer.domElement
    canvas.style.position = 'fixed'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.zIndex = '-1'
    canvas.style.pointerEvents = 'none'
    canvas.style.margin = '0'
    canvas.style.padding = '0'

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.003)

    const camera = new THREE.PerspectiveCamera(
      mobileOptimized ? 70 : 60,
      window.innerWidth / window.innerHeight,
      0.1,
      1200
    )
    camera.position.set(0, 0, mobileOptimized ? 170 : 155)

    const geometry = new THREE.BufferGeometry()
    const basePositions = new Float32Array(particleCount * 3)
    geometry.setAttribute('position', new THREE.BufferAttribute(basePositions, 3))

    const colors = new Float32Array(particleCount * 3)
    const color = new THREE.Color()
    for (let i = 0; i < particleCount; i += 1) {
      color.setHex(PALETTE[i % PALETTE.length])
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: mobileOptimized ? 2.2 : 1.8, // Slightly larger on mobile for visibility
      map: createGlowTexture(),
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      opacity: 0.92,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const shapeTargets = [
      makeSphere(particleCount),
      makeTemple(particleCount),
      makeHavanKund(particleCount),
      makeLotus(particleCount),
      makeDiya(particleCount),
    ]

    geometry.attributes.position.array.set(shapeTargets[0])
    geometry.attributes.position.needsUpdate = true
    geometry.computeBoundingSphere()

    const state = { progress: 0 }
    const scrollInstance = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      scrub: mobileOptimized ? 0.5 : true, // Smoother scrub on mobile
      onUpdate: (self) => {
        state.progress = self.progress
      },
    })

    const clock = new THREE.Clock()
    let frameId

    const handleResize = () => {
      const { innerWidth, innerHeight } = window
      camera.aspect = innerWidth / innerHeight

      // Slight responsive tuning for different viewport shapes
      if (innerWidth < 1024) {
        camera.fov = 68
        camera.position.z = 165
      } else {
        camera.fov = 60
        camera.position.z = 155
      }

      camera.updateProjectionMatrix()
      renderer.setSize(innerWidth, innerHeight)
      // Ensure canvas covers full viewport
      canvas.style.width = '100%'
      canvas.style.height = '100%'
    }

    window.addEventListener('resize', handleResize)

    const positions = geometry.attributes.position.array
    const lerp = THREE.MathUtils.lerp
    const segmentSize = 1 / (shapeTargets.length - 1)

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime()
      const idx = Math.min(
        shapeTargets.length - 2,
        Math.floor(state.progress / segmentSize)
      )
      const localT =
        (state.progress - idx * segmentSize) / (segmentSize || 1)
      const current = shapeTargets[idx]
      const next = shapeTargets[idx + 1]

      // Gentle global fire-like flicker
      material.opacity = 0.9 + Math.sin(elapsed * 1.6) * 0.04

      // Scroll-driven "zoom pulse" as we transition between shapes
      // Reduced motion on mobile for smoother scrolling
      const zoomPhase = Math.sin(localT * Math.PI)
      const baseZ = mobileOptimized ? 170 : 155
      const zoomAmount = mobileOptimized ? 12 : 18 // Less zoom on mobile
      camera.position.z = baseZ + zoomAmount * (1 - zoomPhase)
      material.size = (mobileOptimized ? 2.2 : 1.8) + (mobileOptimized ? 0.3 : 0.5) * zoomPhase

      for (let i = 0; i < particleCount; i += 1) {
        const i3 = i * 3
        const baseX = lerp(current[i3], next[i3], localT)
        const baseY = lerp(current[i3 + 1], next[i3 + 1], localT)
        const baseZ = lerp(current[i3 + 2], next[i3 + 2], localT)

        // Reduced motion amplitude on mobile for smoother scrolling
        const motionScale = mobileOptimized ? 0.6 : 1
        positions[i3] = baseX + Math.sin(elapsed * 0.9 + i * 0.0018) * 0.22 * motionScale
        positions[i3 + 1] =
          baseY + Math.cos(elapsed * 0.8 + i * 0.0014) * 0.2 * motionScale
        positions[i3 + 2] =
          baseZ + Math.sin(elapsed * 0.7 + i * 0.0011) * 0.18 * motionScale
      }

      geometry.attributes.position.needsUpdate = true
      // Reduced rotation on mobile for smoother scrolling
      points.rotation.y += mobileOptimized ? 0.0003 : 0.0006
      points.rotation.x = 0

      renderer.render(scene, camera)
      frameId = requestAnimationFrame(renderFrame)
    }

    frameId = requestAnimationFrame(renderFrame)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      scrollInstance?.kill()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (container.contains(canvas)) {
        container.removeChild(canvas)
      }
    }
  }, [isMobile])

  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed inset-0 -z-10 pointer-events-none" 
        style={{
          width: '100%',
          height: '100%',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
        aria-hidden="true" 
      />
    </>
  )
}

export default AncientParticleBackground