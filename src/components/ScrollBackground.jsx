import { useScroll, useTransform, motion, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'

const ScrollBackground = () => {
  // Track scroll on the document instead of a container
  const { scrollYProgress } = useScroll()

  // Animated values for continuous motion
  const time = useMotionValue(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      time.set(time.get() + 0.01)
    }, 16)
    return () => clearInterval(interval)
  }, [time])

  // Create smooth transitions between scenes
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.35], [1, 1, 0])
  const scene2Opacity = useTransform(scrollYProgress, [0.2, 0.35, 0.6, 0.75], [0, 1, 1, 0])
  const scene3Opacity = useTransform(scrollYProgress, [0.6, 0.75, 0.9, 0.98], [0, 1, 1, 0])
  const scene4Opacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])

  // Parallax effects
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const parallaxY3 = useTransform(scrollYProgress, [0, 1], [0, -250])
  
  // Animated rotation for patterns
  const rotate1 = useTransform(time, [0, 1], [0, 360])
  const rotate2 = useTransform(time, [0, 1], [360, 0])
  const scale1 = useTransform(time, [0, 0.5, 1], [1, 1.1, 1])

  // Sanskrit/Devanagari text patterns (sample characters)
  const sanskritText = "ॐ नमो भगवते वासुदेवाय ॐ शान्ति शान्ति शान्ति"
  const devanagariPattern = "॥ ॐ ॥"

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden will-change-transform pointer-events-none">
      {/* Scene 1: Elegant Ancient Temple - South Indian Style with Detailed Gopuram */}
      <motion.div
        style={{ opacity: scene1Opacity, y: parallaxY1 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/80 to-charcoal/90">
          {/* Centralized Elegant Temple */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="relative w-full max-w-3xl h-full">
              <svg viewBox="0 0 600 900" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Temple Base Platform */}
                <rect x="150" y="750" width="300" height="100" fill="#D4AF37" opacity="0.3" rx="8" />
                
                {/* Main Temple Structure */}
                <rect x="180" y="600" width="240" height="150" fill="#D4AF37" opacity="0.4" rx="5" />
                
                {/* Elegant Multi-tiered Gopuram */}
                {/* Base tier */}
                <rect x="240" y="550" width="120" height="50" fill="#FF9933" opacity="0.5" />
                {/* Second tier */}
                <rect x="260" y="480" width="80" height="70" fill="#D4AF37" opacity="0.6" />
                {/* Third tier */}
                <rect x="275" y="420" width="50" height="60" fill="#FF9933" opacity="0.7" />
                {/* Top tier */}
                <rect x="285" y="360" width="30" height="60" fill="#D4AF37" opacity="0.8" />
                {/* Finial */}
                <polygon points="300,360 295,340 300,350 305,340" fill="#FF9933" opacity="0.9" />
                
                {/* Decorative elements on each tier */}
                <circle cx="300" cy="575" r="4" fill="#D4AF37" opacity="0.8" />
                <circle cx="300" cy="515" r="3" fill="#FF9933" opacity="0.8" />
                <circle cx="300" cy="450" r="3" fill="#D4AF37" opacity="0.8" />
                <circle cx="300" cy="390" r="2" fill="#FF9933" opacity="0.9" />
                
                {/* Temple entrance arch */}
                <path d="M270,750 Q300,700 330,750" fill="none" stroke="#FF9933" strokeWidth="3" opacity="0.5" />
                <rect x="280" y="730" width="40" height="50" fill="#1a1a1a" opacity="0.4" />
                
                {/* Side decorative pillars */}
                <rect x="120" y="620" width="30" height="120" fill="#D4AF37" opacity="0.3" />
                <rect x="450" y="620" width="30" height="120" fill="#D4AF37" opacity="0.3" />
                
                {/* Central mandala/carving */}
                <circle cx="300" cy="675" r="20" fill="none" stroke="#FF9933" strokeWidth="1.5" opacity="0.4" />
                <circle cx="300" cy="675" r="12" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
                
                {/* Sanskrit Om at top */}
                <text x="300" y="345" textAnchor="middle" fontSize="28" fill="#D4AF37" opacity="0.8" fontFamily="'Noto Sans Devanagari', serif">ॐ</text>
              </svg>
            </div>
          </div>

          {/* Subtle Sanskrit text pattern */}
          <div className="absolute inset-0 opacity-8 flex items-center justify-center">
            <div className="text-ancient-gold font-serif text-5xl" style={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
              {devanagariPattern}
            </div>
          </div>

          {/* Animated golden glow from temple */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-ancient-gold/25 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </motion.div>

      {/* Scene 2: Elegant Mughal Architecture - Inspired by Red Fort/Taj Mahal */}
      <motion.div
        style={{ 
          opacity: scene2Opacity,
          y: parallaxY2
        }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sandstone/35 via-sandstone/25 to-charcoal/85">
          {/* Subtle parchment texture */}
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(212, 175, 55, 0.08) 4px, rgba(212, 175, 55, 0.08) 8px),
                repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(193, 154, 107, 0.08) 4px, rgba(193, 154, 107, 0.08) 8px)
              `,
            }}
          />

          {/* Centralized Elegant Historical Building */}
          <div className="absolute inset-0 flex items-center justify-center opacity-35">
            <div className="relative w-full max-w-4xl h-full">
              <svg viewBox="0 0 800 700" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Building Platform */}
                <rect x="200" y="550" width="400" height="120" fill="#D4AF37" opacity="0.4" rx="12" />
                
                {/* Main Structure */}
                <rect x="240" y="380" width="320" height="170" fill="#D4AF37" opacity="0.5" rx="8" />
                
                {/* Elegant Central Dome */}
                <ellipse cx="400" cy="340" rx="65" ry="50" fill="#FF9933" opacity="0.6" />
                <ellipse cx="400" cy="315" rx="50" ry="38" fill="#D4AF37" opacity="0.7" />
                <circle cx="400" cy="295" r="12" fill="#FF9933" opacity="0.8" />
                
                {/* Graceful Side Minarets */}
                <rect x="260" y="400" width="40" height="150" fill="#D4AF37" opacity="0.5" rx="4" />
                <rect x="500" y="400" width="40" height="150" fill="#D4AF37" opacity="0.5" rx="4" />
                <ellipse cx="280" cy="385" rx="15" ry="20" fill="#FF9933" opacity="0.6" />
                <ellipse cx="520" cy="385" rx="15" ry="20" fill="#FF9933" opacity="0.6" />
                <circle cx="280" cy="370" r="6" fill="#D4AF37" opacity="0.7" />
                <circle cx="520" cy="370" r="6" fill="#D4AF37" opacity="0.7" />
                
                {/* Elegant Arches */}
                <path d="M280,550 Q320,500 360,550" fill="none" stroke="#FF9933" strokeWidth="2.5" opacity="0.5" />
                <path d="M360,550 Q400,490 440,550" fill="none" stroke="#FF9933" strokeWidth="2.5" opacity="0.5" />
                <path d="M440,550 Q480,500 520,550" fill="none" stroke="#FF9933" strokeWidth="2.5" opacity="0.5" />
                
                {/* Central Grand Entrance */}
                <path d="M360,550 Q400,460 440,550" fill="#1a1a1a" opacity="0.35" />
                <path d="M360,550 Q400,460 440,550" fill="none" stroke="#FF9933" strokeWidth="3" opacity="0.6" />
                
                {/* Decorative Pattern */}
                <circle cx="400" cy="465" r="25" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.4" />
                <circle cx="400" cy="465" r="15" fill="none" stroke="#FF9933" strokeWidth="1" opacity="0.5" />
                
                {/* Sanskrit Om */}
                <text x="400" y="275" textAnchor="middle" fontSize="30" fill="#D4AF37" opacity="0.7" fontFamily="'Noto Sans Devanagari', serif">ॐ</text>
              </svg>
            </div>
          </div>

          {/* Subtle Sanskrit text */}
          <div className="absolute inset-0 opacity-6 flex items-center justify-center">
            <div className="text-ancient-gold font-serif text-4xl" style={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
              {sanskritText.substring(0, 18)}
            </div>
          </div>

          {/* Animated golden sun effect */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/3 left-1/2 w-[550px] h-[550px] bg-saffron/35 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </motion.div>

      {/* Scene 3: Stone Carved Temple Walls with Scriptures */}
      <motion.div
        style={{ 
          opacity: scene3Opacity,
          y: parallaxY3
        }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-sandstone/25 to-charcoal/85">
          {/* Stone texture */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(193, 154, 107, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212, 175, 55, 0.05) 10px, rgba(212, 175, 55, 0.05) 20px)
              `,
            }}
          />

          {/* Carved Stone Panels with Sanskrit */}
          <div className="absolute inset-0 opacity-30">
            {/* Left panel */}
            <div className="absolute left-[5%] top-[10%] bottom-[10%] w-[25%] border-2 border-ancient-gold/40 bg-charcoal/50">
              <div className="p-8 space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`panel-text-${i}`}
                    className="text-ancient-gold/60 font-serif text-lg"
                    style={{ fontFamily: "'Noto Sans Devanagari', serif" }}
                  >
                    {sanskritText.substring(0, 12 + (i % 3))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right panel */}
            <div className="absolute right-[5%] top-[15%] bottom-[15%] w-[25%] border-2 border-saffron/40 bg-charcoal/50">
              <div className="p-8 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`panel-text-r-${i}`}
                    className="text-saffron/60 font-serif text-lg text-right"
                    style={{ fontFamily: "'Noto Sans Devanagari', serif" }}
                  >
                    {sanskritText.substring(0, 10 + (i % 4))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Yantra/Mandala Carvings */}
          <motion.div
            style={{ rotate: rotate2 }}
            className="absolute top-1/2 left-1/2 w-[500px] h-[500px] transform -translate-x-1/2 -translate-y-1/2 opacity-25"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <polygon points="100,20 120,80 180,80 130,120 150,180 100,140 50,180 70,120 20,80 80,80" 
                fill="none" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="#FF9933" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="#D4AF37" strokeWidth="1" />
              {/* Inner patterns */}
              <polygon points="100,50 110,70 130,70 115,85 120,105 100,95 80,105 85,85 70,70 90,70" 
                fill="none" stroke="#FF9933" strokeWidth="1" />
            </svg>
          </motion.div>

          {/* Sanskrit Om symbols carved */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(12)].map((_, i) => (
              <div
                key={`om-${i}`}
                className="absolute text-ancient-gold/50 font-serif text-4xl"
                style={{
                  left: `${10 + (i % 4) * 25}%`,
                  top: `${15 + Math.floor(i / 4) * 25}%`,
                  fontFamily: "'Noto Sans Devanagari', serif"
                }}
              >
                ॐ
              </div>
            ))}
          </div>

          {/* Stone Statues in niches on walls */}
          <div className="absolute inset-0 opacity-25">
            {/* Left wall statue niche */}
            <div className="absolute left-[8%] top-1/3 w-20 h-40">
              <svg viewBox="0 0 100 200" className="w-full h-full">
                {/* Niche arch */}
                <path d="M10,180 Q50,140 90,180 L90,200 L10,200 Z" fill="#1a1a1a" opacity="0.5" />
                <path d="M10,180 Q50,140 90,180" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.6" />
                {/* Statue inside niche */}
                <ellipse cx="50" cy="150" rx="8" ry="25" fill="#D4AF37" opacity="0.5" />
                <circle cx="50" cy="120" r="7" fill="#D4AF37" opacity="0.6" />
                <polygon points="50,110 47,105 50,108 53,105" fill="#FF9933" opacity="0.6" />
              </svg>
            </div>

            {/* Right wall statue niche */}
            <div className="absolute right-[8%] top-1/2 w-20 h-40">
              <svg viewBox="0 0 100 200" className="w-full h-full">
                {/* Niche arch */}
                <path d="M10,180 Q50,140 90,180 L90,200 L10,200 Z" fill="#1a1a1a" opacity="0.5" />
                <path d="M10,180 Q50,140 90,180" fill="none" stroke="#FF9933" strokeWidth="2" opacity="0.6" />
                {/* Statue inside niche */}
                <ellipse cx="50" cy="150" rx="8" ry="25" fill="#FF9933" opacity="0.5" />
                <circle cx="50" cy="120" r="7" fill="#FF9933" opacity="0.6" />
                <polygon points="50,110 47,105 50,108 53,105" fill="#D4AF37" opacity="0.6" />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scene 4: Deep Temple Sanctum with Ancient Texts */}
      <motion.div
        style={{ opacity: scene4Opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/80 to-charcoal/85">
          {/* Temple Sanctum Structure */}
          <div className="absolute inset-0 opacity-35">
            {/* Central shrine area */}
            <div className="absolute top-1/4 left-1/4 right-1/4 bottom-1/4 border-4 border-ancient-gold/50 bg-charcoal/70">
              {/* Shrine arch */}
              <div className="absolute top-0 left-1/4 right-1/4 h-32">
                <svg viewBox="0 0 400 200" className="w-full h-full">
                  <path
                    d="M0,200 Q100,50 200,50 T400,200"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="3"
                  />
                  <path
                    d="M50,200 Q150,80 200,80 T350,200"
                    fill="none"
                    stroke="#FF9933"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Sanskrit text around shrine */}
              <div className="absolute top-40 left-8 right-8 text-center">
                <div className="text-ancient-gold/60 font-serif text-2xl mb-4" style={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
                  {sanskritText}
                </div>
                <div className="text-saffron/50 font-serif text-xl" style={{ fontFamily: "'Noto Sans Devanagari', serif" }}>
                  {devanagariPattern} {devanagariPattern} {devanagariPattern}
                </div>
              </div>
            </div>
          </div>

          {/* Rotating mandala behind shrine */}
          <motion.div
            style={{ rotate: rotate1 }}
            className="absolute top-1/2 left-1/2 w-[700px] h-[700px] transform -translate-x-1/2 -translate-y-1/2 opacity-20"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#FF9933" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="#D4AF37" strokeWidth="1" />
              <polygon points="100,10 110,50 150,50 120,80 130,120 100,100 70,120 80,80 50,50 90,50" 
                fill="none" stroke="#FF9933" strokeWidth="1.5" />
              {/* Inner details */}
              {[...Array(8)].map((_, i) => (
                <line
                  key={i}
                  x1="100"
                  y1="100"
                  x2={100 + 60 * Math.cos((i * Math.PI) / 4)}
                  y2={100 + 60 * Math.sin((i * Math.PI) / 4)}
                  stroke="#D4AF37"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          </motion.div>

          {/* Animated light sources */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-ancient-gold/40 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </motion.div>

      {/* Reduced overlay for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-black/15 pointer-events-none" />
    </div>
  )
}

export default ScrollBackground
