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
      {/* Scene 1: Somanath Temple - Detailed Shiva Temple with Distinctive Shikhara */}
      <motion.div
        style={{ opacity: scene1Opacity, y: parallaxY1 }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/85 to-charcoal/90">
          {/* Detailed Somanath Temple Structure */}
          <div className="absolute inset-0 flex items-center justify-center opacity-45">
            <div className="relative w-full max-w-4xl h-full">
              <svg viewBox="0 0 700 950" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Temple Base/Platform */}
                <rect x="200" y="800" width="300" height="120" fill="#D4AF37" opacity="0.4" rx="10" />
                
                {/* Main Temple Structure - Rectangular base */}
                <rect x="220" y="650" width="260" height="150" fill="#D4AF37" opacity="0.5" rx="6" />
                
                {/* Distinctive Curved Shikhara (Tower) - Somanath style */}
                {/* Base of shikhara */}
                <rect x="280" y="600" width="140" height="50" fill="#FF9933" opacity="0.6" rx="4" />
                
                {/* Curved shikhara body - characteristic curved shape */}
                <path d="M280,600 Q350,550 420,600" fill="#D4AF37" opacity="0.6" />
                <path d="M290,580 Q350,520 410,580" fill="#FF9933" opacity="0.7" />
                <path d="M300,560 Q350,490 400,560" fill="#D4AF37" opacity="0.8" />
                
                {/* Top of shikhara - rounded peak */}
                <ellipse cx="350" cy="480" rx="50" ry="40" fill="#FF9933" opacity="0.8" />
                <ellipse cx="350" cy="460" rx="35" ry="30" fill="#D4AF37" opacity="0.9" />
                
                {/* Finial/Kalasha at top */}
                <circle cx="350" cy="440" r="8" fill="#FF9933" opacity="0.9" />
                <polygon points="350,432 345,420 350,425 355,420" fill="#D4AF37" opacity="1" />
                
                {/* Decorative horizontal bands on shikhara */}
                <line x1="290" y1="590" x2="410" y2="590" stroke="#FF9933" strokeWidth="2" opacity="0.6" />
                <line x1="300" y1="570" x2="400" y2="570" stroke="#D4AF37" strokeWidth="1.5" opacity="0.7" />
                <line x1="310" y1="550" x2="390" y2="550" stroke="#FF9933" strokeWidth="1.5" opacity="0.7" />
                
                {/* Temple entrance - arched doorway */}
                <path d="M320,800 Q350,720 380,800" fill="none" stroke="#FF9933" strokeWidth="4" opacity="0.6" />
                <path d="M325,800 Q350,730 375,800" fill="#1a1a1a" opacity="0.5" />
                
                {/* Side pillars/columns */}
                <rect x="180" y="670" width="25" height="130" fill="#D4AF37" opacity="0.4" />
                <rect x="495" y="670" width="25" height="130" fill="#D4AF37" opacity="0.4" />
                
                {/* Decorative carvings on temple walls */}
                <circle cx="350" cy="725" r="18" fill="none" stroke="#FF9933" strokeWidth="2" opacity="0.5" />
                <circle cx="350" cy="725" r="10" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" />
                
                {/* Trishul (Trident) symbol - characteristic of Shiva temple */}
                <line x1="350" y1="680" x2="350" y2="700" stroke="#FF9933" strokeWidth="3" opacity="0.7" />
                <line x1="350" y1="690" x2="340" y2="685" stroke="#FF9933" strokeWidth="2" opacity="0.7" />
                <line x1="350" y1="690" x2="360" y2="685" stroke="#FF9933" strokeWidth="2" opacity="0.7" />
                
              </svg>
            </div>
          </div>


          {/* Animated golden glow */}
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

      {/* Scene 2: Tirupati Balaji Temple - Detailed Venkateswara Temple with Grand Gopuram */}
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

          {/* Detailed Tirupati Balaji Temple */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="relative w-full max-w-4xl h-full">
              <svg viewBox="0 0 800 850" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Temple Base Platform */}
                <rect x="200" y="700" width="400" height="130" fill="#D4AF37" opacity="0.4" rx="10" />
                
                {/* Main Temple Structure */}
                <rect x="240" y="550" width="320" height="150" fill="#D4AF37" opacity="0.5" rx="6" />
                
                {/* Grand Multi-tiered Gopuram - Tirupati style */}
                {/* Base tier - widest */}
                <rect x="220" y="520" width="360" height="30" fill="#FF9933" opacity="0.6" />
                {/* Second tier */}
                <rect x="260" y="480" width="280" height="40" fill="#D4AF37" opacity="0.7" />
                {/* Third tier */}
                <rect x="300" y="440" width="200" height="40" fill="#FF9933" opacity="0.7" />
                {/* Fourth tier */}
                <rect x="330" y="400" width="140" height="40" fill="#D4AF37" opacity="0.8" />
                {/* Fifth tier */}
                <rect x="350" y="360" width="100" height="40" fill="#FF9933" opacity="0.8" />
                {/* Sixth tier */}
                <rect x="365" y="320" width="70" height="40" fill="#D4AF37" opacity="0.9" />
                {/* Top tier */}
                <rect x="375" y="280" width="50" height="40" fill="#FF9933" opacity="0.9" />
                {/* Finial */}
                <polygon points="400,280 390,260 400,270 410,260" fill="#D4AF37" opacity="1" />
                
                {/* Decorative elements on each tier */}
                {[540, 500, 460, 420, 380, 340, 300].map((y, i) => (
                  <circle key={i} cx="400" cy={y} r={4 - i * 0.3} fill="#D4AF37" opacity={0.8 - i * 0.05} />
                ))}
                
                {/* Temple entrance - grand arch */}
                <path d="M340,700 Q400,600 460,700" fill="none" stroke="#FF9933" strokeWidth="4" opacity="0.6" />
                <path d="M350,700 Q400,610 450,700" fill="#1a1a1a" opacity="0.4" />
                
                {/* Side decorative pillars */}
                <rect x="180" y="570" width="30" height="130" fill="#D4AF37" opacity="0.4" />
                <rect x="590" y="570" width="30" height="130" fill="#D4AF37" opacity="0.4" />
                
                {/* Decorative carvings */}
                <circle cx="400" cy="625" r="20" fill="none" stroke="#FF9933" strokeWidth="2" opacity="0.5" />
                <circle cx="400" cy="625" r="12" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" />
                
              </svg>
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

      {/* Scene 3: Ancient Stone Sculpture - Detailed Deity/Guardian Statue */}
      <motion.div
        style={{ 
          opacity: scene3Opacity,
          y: parallaxY3
        }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-sandstone/25 to-charcoal/85">
          {/* Stone texture background */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(193, 154, 107, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)
              `,
            }}
          />

          {/* Detailed Ancient Stone Sculpture */}
          <div className="absolute inset-0 flex items-center justify-center opacity-45">
            <div className="relative w-full max-w-3xl h-full">
              <svg viewBox="0 0 350 900" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Sculpture Base/Platform */}
                <rect x="100" y="800" width="150" height="80" fill="#D4AF37" opacity="0.5" rx="8" />
                
                {/* Main Sculpture Body - Standing Deity/Guardian */}
                {/* Lower body/legs */}
                <ellipse cx="175" cy="650" rx="30" ry="70" fill="#D4AF37" opacity="0.6" />
                
                {/* Waist area */}
                <ellipse cx="175" cy="580" rx="25" ry="40" fill="#D4AF37" opacity="0.6" />
                
                {/* Upper body/chest */}
                <ellipse cx="175" cy="500" rx="28" ry="50" fill="#D4AF37" opacity="0.6" />
                
                {/* Shoulders */}
                <ellipse cx="155" cy="480" rx="12" ry="20" fill="#D4AF37" opacity="0.6" />
                <ellipse cx="195" cy="480" rx="12" ry="20" fill="#D4AF37" opacity="0.6" />
                
                {/* Head */}
                <circle cx="175" cy="420" r="22" fill="#D4AF37" opacity="0.7" />
                
                {/* Crown/Headgear - elaborate */}
                <polygon points="175,395 165,375 175,385 185,375" fill="#FF9933" opacity="0.8" />
                <rect x="170" y="375" width="10" height="15" fill="#D4AF37" opacity="0.8" />
                <circle cx="175" cy="370" r="4" fill="#FF9933" opacity="0.9" />
                
                {/* Arms - prayer/gesture position */}
                {/* Left arm */}
                <ellipse cx="145" cy="520" rx="10" ry="45" fill="#D4AF37" opacity="0.6" transform="rotate(-25 145 520)" />
                <circle cx="135" cy="490" r="8" fill="#FF9933" opacity="0.7" />
                
                {/* Right arm */}
                <ellipse cx="205" cy="520" rx="10" ry="45" fill="#D4AF37" opacity="0.6" transform="rotate(25 205 520)" />
                <circle cx="215" cy="490" r="8" fill="#FF9933" opacity="0.7" />
                
                {/* Legs */}
                <ellipse cx="160" cy="720" rx="12" ry="60" fill="#D4AF37" opacity="0.6" />
                <ellipse cx="190" cy="720" rx="12" ry="60" fill="#D4AF37" opacity="0.6" />
                
                {/* Feet/Base */}
                <ellipse cx="160" cy="780" rx="15" ry="8" fill="#FF9933" opacity="0.6" />
                <ellipse cx="190" cy="780" rx="15" ry="8" fill="#FF9933" opacity="0.6" />
                
                {/* Decorative Aura/Halo behind head */}
                <circle cx="175" cy="420" r="35" fill="none" stroke="#FF9933" strokeWidth="2.5" opacity="0.5" />
                <circle cx="175" cy="420" r="28" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.6" />
                
                {/* Decorative patterns on body */}
                <circle cx="175" cy="500" r="15" fill="none" stroke="#FF9933" strokeWidth="1.5" opacity="0.5" />
                <circle cx="175" cy="580" r="12" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
          </div>

          {/* Animated golden glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-[400px] h-[500px] bg-ancient-gold/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </motion.div>

      {/* Scene 4: Ancient Temple Complex - Multiple Structures */}
      <motion.div
        style={{ opacity: scene4Opacity }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/85 to-charcoal/90">
          {/* Detailed Ancient Temple Complex */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="relative w-full max-w-5xl h-full">
              <svg viewBox="0 0 900 850" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Central Main Temple */}
                {/* Base */}
                <rect x="350" y="700" width="200" height="120" fill="#D4AF37" opacity="0.4" rx="10" />
                {/* Main structure */}
                <rect x="370" y="580" width="160" height="120" fill="#D4AF37" opacity="0.5" rx="6" />
                {/* Central shikhara */}
                <rect x="410" y="520" width="80" height="60" fill="#FF9933" opacity="0.6" />
                <ellipse cx="450" cy="500" rx="35" ry="30" fill="#D4AF37" opacity="0.7" />
                <circle cx="450" cy="485" r="8" fill="#FF9933" opacity="0.8" />
                
                {/* Left Smaller Temple */}
                <rect x="150" y="720" width="120" height="100" fill="#D4AF37" opacity="0.4" rx="8" />
                <rect x="170" y="650" width="80" height="70" fill="#D4AF37" opacity="0.5" rx="5" />
                <rect x="190" y="610" width="40" height="40" fill="#FF9933" opacity="0.6" />
                <polygon points="190,610 210,580 230,610" fill="#D4AF37" opacity="0.7" />
                
                {/* Right Smaller Temple */}
                <rect x="630" y="720" width="120" height="100" fill="#D4AF37" opacity="0.4" rx="8" />
                <rect x="650" y="650" width="80" height="70" fill="#D4AF37" opacity="0.5" rx="5" />
                <rect x="670" y="610" width="40" height="40" fill="#FF9933" opacity="0.6" />
                <polygon points="670,610 690,580 710,610" fill="#D4AF37" opacity="0.7" />
                
                {/* Connecting Structures/Walls */}
                <rect x="270" y="730" width="80" height="90" fill="#D4AF37" opacity="0.3" />
                <rect x="550" y="730" width="80" height="90" fill="#D4AF37" opacity="0.3" />
                
                {/* Decorative Arches */}
                <path d="M280,730 Q320,700 360,730" fill="none" stroke="#FF9933" strokeWidth="2" opacity="0.5" />
                <path d="M540,730 Q580,700 620,730" fill="none" stroke="#FF9933" strokeWidth="2" opacity="0.5" />
                
                {/* Central entrance */}
                <path d="M420,820 Q450,760 480,820" fill="none" stroke="#FF9933" strokeWidth="3" opacity="0.6" />
                <path d="M430,820 Q450,770 470,820" fill="#1a1a1a" opacity="0.4" />
                
                {/* Decorative elements */}
                <circle cx="450" cy="640" r="18" fill="none" stroke="#FF9933" strokeWidth="2" opacity="0.5" />
                <circle cx="450" cy="640" r="10" fill="none" stroke="#D4AF37" strokeWidth="1.5" opacity="0.6" />
                </svg>
            </div>
          </div>

          {/* Animated golden glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-ancient-gold/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      </motion.div>

      {/* Reduced overlay for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-black/15 pointer-events-none" />
    </div>
  )
}

export default ScrollBackground
