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
      {/* Scene 1: Ancient Temple Interior with Pillars and Carvings */}
      <motion.div
        style={{ opacity: scene1Opacity, y: parallaxY1 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/75 to-charcoal/85">
          {/* Temple Pillars - More Realistic */}
          <div className="absolute inset-0 opacity-40">
            {/* Left Pillars */}
            <div className="absolute left-[15%] top-0 bottom-0 w-3 bg-gradient-to-b from-transparent via-ancient-gold/60 to-transparent">
              {/* Pillar base */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-ancient-gold/40" />
              {/* Pillar capital */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-ancient-gold/50" />
              {/* Carved patterns on pillar */}
              <div className="absolute top-1/4 left-0 right-0 h-32 border-l-2 border-r-2 border-ancient-gold/30" />
            </div>
            <div className="absolute left-[25%] top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-saffron/50 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-saffron/30" />
              <div className="absolute top-0 left-0 right-0 h-12 bg-saffron/40" />
            </div>
            
            {/* Right Pillars */}
            <div className="absolute right-[15%] top-0 bottom-0 w-3 bg-gradient-to-b from-transparent via-ancient-gold/60 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-ancient-gold/40" />
              <div className="absolute top-0 left-0 right-0 h-16 bg-ancient-gold/50" />
              <div className="absolute top-1/4 left-0 right-0 h-32 border-l-2 border-r-2 border-ancient-gold/30" />
            </div>
            <div className="absolute right-[25%] top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-saffron/50 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-saffron/30" />
              <div className="absolute top-0 left-0 right-0 h-12 bg-saffron/40" />
            </div>
          </div>

          {/* Temple Arch/Ceiling Structure */}
          <div className="absolute top-0 left-0 right-0 h-1/3 opacity-30">
            <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
              {/* Temple arch */}
              <path
                d="M0,400 Q300,200 600,100 T1200,100 L1200,0 L0,0 Z"
                fill="url(#templeGradient)"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="templeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#FF9933" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Carved Temple Motifs */}
          <div className="absolute inset-0 opacity-20">
            {/* Lotus patterns */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`lotus-${i}`}
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 30}%`,
                  rotate: rotate1,
                }}
                className="absolute w-16 h-16"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="30" fill="none" stroke="#D4AF37" strokeWidth="1" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="#FF9933" strokeWidth="0.5" />
                  {[...Array(8)].map((_, j) => (
                    <ellipse
                      key={j}
                      cx={50 + 25 * Math.cos((j * Math.PI) / 4)}
                      cy={50 + 25 * Math.sin((j * Math.PI) / 4)}
                      rx="8"
                      ry="15"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      transform={`rotate(${j * 45} 50 50)`}
                    />
                  ))}
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Temple Statues/Deities Silhouettes */}
          <div className="absolute inset-0 opacity-25">
            {/* Left side statue - Guardian/Deity */}
            <div className="absolute left-[8%] bottom-0 w-24 h-80">
              <svg viewBox="0 0 100 300" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
                {/* Statue base/platform */}
                <rect x="30" y="280" width="40" height="20" fill="#D4AF37" opacity="0.6" />
                {/* Statue body - standing figure */}
                <ellipse cx="50" cy="200" rx="15" ry="40" fill="#D4AF37" opacity="0.5" />
                {/* Head */}
                <circle cx="50" cy="150" r="12" fill="#D4AF37" opacity="0.6" />
                {/* Crown/Headgear */}
                <polygon points="50,130 45,120 50,125 55,120" fill="#FF9933" opacity="0.6" />
                {/* Arms - prayer position */}
                <ellipse cx="35" cy="180" rx="8" ry="25" fill="#D4AF37" opacity="0.4" transform="rotate(-20 35 180)" />
                <ellipse cx="65" cy="180" rx="8" ry="25" fill="#D4AF37" opacity="0.4" transform="rotate(20 65 180)" />
                {/* Decorative aura */}
                <circle cx="50" cy="150" r="25" fill="none" stroke="#FF9933" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>

            {/* Right side statue - Guardian/Deity */}
            <div className="absolute right-[8%] bottom-0 w-24 h-80">
              <svg viewBox="0 0 100 300" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
                {/* Statue base/platform */}
                <rect x="30" y="280" width="40" height="20" fill="#FF9933" opacity="0.6" />
                {/* Statue body - standing figure */}
                <ellipse cx="50" cy="200" rx="15" ry="40" fill="#FF9933" opacity="0.5" />
                {/* Head */}
                <circle cx="50" cy="150" r="12" fill="#FF9933" opacity="0.6" />
                {/* Crown/Headgear */}
                <polygon points="50,130 45,120 50,125 55,120" fill="#D4AF37" opacity="0.6" />
                {/* Arms - prayer position */}
                <ellipse cx="35" cy="180" rx="8" ry="25" fill="#FF9933" opacity="0.4" transform="rotate(-20 35 180)" />
                <ellipse cx="65" cy="180" rx="8" ry="25" fill="#FF9933" opacity="0.4" transform="rotate(20 65 180)" />
                {/* Decorative aura */}
                <circle cx="50" cy="150" r="25" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>

            {/* Central decorative statue element */}
            <div className="absolute left-1/2 bottom-0 w-20 h-60 transform -translate-x-1/2">
              <svg viewBox="0 0 80 200" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
                {/* Base */}
                <rect x="25" y="180" width="30" height="20" fill="#D4AF37" opacity="0.5" />
                {/* Central element - lotus or deity symbol */}
                <circle cx="40" cy="140" r="20" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.6" />
                <circle cx="40" cy="140" r="12" fill="none" stroke="#FF9933" strokeWidth="1" opacity="0.5" />
                {/* Petals/rays */}
                {[...Array(8)].map((_, i) => (
                  <line
                    key={i}
                    x1="40"
                    y1="140"
                    x2={40 + 20 * Math.cos((i * Math.PI) / 4)}
                    y2={140 + 20 * Math.sin((i * Math.PI) / 4)}
                    stroke="#D4AF37"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Sanskrit Text Carvings on Walls */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute left-[20%] top-1/4 text-ancient-gold font-serif text-2xl transform -rotate-90 whitespace-nowrap">
              {devanagariPattern}
            </div>
            <div className="absolute right-[20%] top-1/3 text-saffron font-serif text-xl transform rotate-90 whitespace-nowrap">
              {devanagariPattern}
            </div>
            <div className="absolute left-[30%] bottom-1/4 text-ancient-gold/80 font-serif text-lg">
              ॐ
            </div>
            <div className="absolute right-[30%] bottom-1/3 text-saffron/80 font-serif text-lg">
              ॐ
            </div>
          </div>

          {/* Animated gold light sources */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/3 left-1/2 w-96 h-96 bg-ancient-gold/40 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </motion.div>

      {/* Scene 2: Ancient Manuscript/Text with Temple Silhouettes */}
      <motion.div
        style={{ 
          opacity: scene2Opacity,
          y: parallaxY2
        }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-sandstone/40 via-sandstone/30 to-charcoal/85">
          {/* Parchment/Manuscript Background */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(212, 175, 55, 0.1) 4px, rgba(212, 175, 55, 0.1) 8px),
                repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(193, 154, 107, 0.1) 4px, rgba(193, 154, 107, 0.1) 8px),
                linear-gradient(180deg, rgba(212, 175, 55, 0.05) 0%, transparent 50%, rgba(212, 175, 55, 0.05) 100%)
              `,
            }}
          />

          {/* Sanskrit Scripture Text Lines */}
          <div className="absolute inset-0 opacity-25">
            {[...Array(12)].map((_, i) => (
              <div
                key={`text-line-${i}`}
                className="absolute left-[10%] right-[10%] h-px bg-ancient-gold/40"
                style={{ top: `${8 + i * 7}%` }}
              />
            ))}
            
            {/* Devanagari text patterns */}
            {[...Array(8)].map((_, i) => (
              <div
                key={`sanskrit-${i}`}
                className="absolute left-[12%] text-ancient-gold/50 font-serif text-xl"
                style={{ 
                  top: `${10 + i * 10}%`,
                  fontFamily: "'Noto Sans Devanagari', serif"
                }}
              >
                {sanskritText.substring(0, 15 + (i % 5))}
              </div>
            ))}
          </div>

          {/* Temple Silhouettes in Background with Gopurams */}
          <div className="absolute bottom-0 left-0 right-0 h-2/5 opacity-35">
            <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
              {/* Temple base */}
              <path
                d="M0,400 L100,380 L200,390 L300,360 L400,375 L500,350 L600,365 L700,340 L800,355 L900,330 L1000,345 L1100,320 L1200,335 L1200,400 Z"
                fill="currentColor"
                className="text-ancient-gold"
              />
              
              {/* Temple structures with spires and gopurams */}
              <rect x="150" y="360" width="60" height="40" fill="currentColor" className="text-ancient-gold" />
              <polygon points="150,360 180,320 210,360" fill="currentColor" className="text-ancient-gold" />
              {/* Gopuram details */}
              <rect x="165" y="320" width="30" height="20" fill="currentColor" className="text-saffron" opacity="0.7" />
              <polygon points="165,320 180,300 195,320" fill="currentColor" className="text-saffron" opacity="0.7" />
              
              {/* Main temple with elaborate gopuram */}
              <rect x="550" y="310" width="80" height="90" fill="currentColor" className="text-ancient-gold" />
              <polygon points="550,310 590,250 630,310" fill="currentColor" className="text-ancient-gold" />
              {/* Multi-tiered gopuram */}
              <rect x="570" y="250" width="40" height="60" fill="currentColor" className="text-saffron" />
              <rect x="575" y="200" width="30" height="50" fill="currentColor" className="text-ancient-gold" opacity="0.8" />
              <polygon points="575,200 590,170 605,200" fill="currentColor" className="text-ancient-gold" opacity="0.8" />
              {/* Gopuram decorative elements */}
              <circle cx="590" cy="185" r="3" fill="currentColor" className="text-saffron" />
              <circle cx="580" cy="185" r="2" fill="currentColor" className="text-saffron" />
              <circle cx="600" cy="185" r="2" fill="currentColor" className="text-saffron" />
              
              {/* Large temple with statue niches */}
              <rect x="950" y="260" width="70" height="140" fill="currentColor" className="text-ancient-gold" />
              <polygon points="950,260 985,200 1020,260" fill="currentColor" className="text-ancient-gold" />
              <rect x="965" y="200" width="30" height="80" fill="currentColor" className="text-saffron" />
              {/* Statue niches on temple walls */}
              <rect x="960" y="300" width="15" height="40" fill="currentColor" className="text-charcoal" opacity="0.4" rx="2" />
              <rect x="1005" y="300" width="15" height="40" fill="currentColor" className="text-charcoal" opacity="0.4" rx="2" />
              
              {/* Temple windows/doors */}
              <rect x="170" y="370" width="20" height="25" fill="currentColor" className="text-charcoal" opacity="0.3" />
              <rect x="580" y="330" width="30" height="50" fill="currentColor" className="text-charcoal" opacity="0.3" />
              <rect x="970" y="300" width="25" height="80" fill="currentColor" className="text-charcoal" opacity="0.3" />
              
              {/* Additional temple structures with toranas (decorative arches) */}
              <path d="M350,360 Q370,340 390,360" fill="none" stroke="currentColor" className="text-ancient-gold" strokeWidth="2" opacity="0.6" />
              <path d="M750,340 Q770,320 790,340" fill="none" stroke="currentColor" className="text-saffron" strokeWidth="2" opacity="0.6" />
              <path d="M1050,320 Q1070,300 1090,320" fill="none" stroke="currentColor" className="text-ancient-gold" strokeWidth="2" opacity="0.6" />
            </svg>
          </div>

          {/* Standing Statues in Scene 2 */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 opacity-30">
            {/* Left guardian statue */}
            <div className="absolute left-[12%] bottom-0 w-16 h-64">
              <svg viewBox="0 0 80 250" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
                {/* Base */}
                <rect x="20" y="230" width="40" height="20" fill="#D4AF37" opacity="0.6" />
                {/* Body */}
                <ellipse cx="40" cy="160" rx="12" ry="35" fill="#D4AF37" opacity="0.5" />
                {/* Head */}
                <circle cx="40" cy="120" r="10" fill="#D4AF37" opacity="0.6" />
                {/* Crown */}
                <polygon points="40,105 35,95 40,100 45,95" fill="#FF9933" opacity="0.7" />
                {/* Arms */}
                <ellipse cx="28" cy="145" rx="6" ry="20" fill="#D4AF37" opacity="0.4" transform="rotate(-25 28 145)" />
                <ellipse cx="52" cy="145" rx="6" ry="20" fill="#D4AF37" opacity="0.4" transform="rotate(25 52 145)" />
                {/* Decorative elements */}
                <circle cx="40" cy="120" r="18" fill="none" stroke="#FF9933" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>

            {/* Right guardian statue */}
            <div className="absolute right-[12%] bottom-0 w-16 h-64">
              <svg viewBox="0 0 80 250" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
                {/* Base */}
                <rect x="20" y="230" width="40" height="20" fill="#FF9933" opacity="0.6" />
                {/* Body */}
                <ellipse cx="40" cy="160" rx="12" ry="35" fill="#FF9933" opacity="0.5" />
                {/* Head */}
                <circle cx="40" cy="120" r="10" fill="#FF9933" opacity="0.6" />
                {/* Crown */}
                <polygon points="40,105 35,95 40,100 45,95" fill="#D4AF37" opacity="0.7" />
                {/* Arms */}
                <ellipse cx="28" cy="145" rx="6" ry="20" fill="#FF9933" opacity="0.4" transform="rotate(-25 28 145)" />
                <ellipse cx="52" cy="145" rx="6" ry="20" fill="#FF9933" opacity="0.4" transform="rotate(25 52 145)" />
                {/* Decorative elements */}
                <circle cx="40" cy="120" r="18" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
              </svg>
            </div>
          </div>

          {/* Animated sun/dawn effect */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/2 w-[500px] h-[500px] bg-saffron/50 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
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
