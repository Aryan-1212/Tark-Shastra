import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import AncientHeading from './AncientHeading'

const Tracks = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const tracks = [
    {
      name: 'AI / ML',
      description: 'Build intelligent systems using machine learning and artificial intelligence',
      icon: '🤖',
      color: 'from-ancient-gold to-saffron',
    },
    {
      name: 'Web & App Development',
      description: 'Create responsive web applications and mobile apps',
      icon: '💻',
      color: 'from-saffron to-burnt-orange',
    },
    {
      name: 'Blockchain',
      description: 'Develop decentralized applications and smart contracts',
      icon: '⛓️',
      color: 'from-burnt-orange to-sandstone',
    },
    {
      name: 'Healthcare',
      description: 'Innovate solutions for better healthcare delivery',
      icon: '🏥',
      color: 'from-sandstone to-ancient-gold',
    },
    {
      name: 'Sustainability',
      description: 'Build eco-friendly solutions for a better tomorrow',
      icon: '🌱',
      color: 'from-ancient-gold to-saffron',
    },
    {
      name: 'FinTech',
      description: 'Revolutionize financial services with technology',
      icon: '💰',
      color: 'from-saffron to-burnt-orange',
    },
  ]

  return (
    <section id="tracks" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="px-2 overflow-hidden">
            <AncientHeading
              text="Tracks & Domains"
              variant="h2"
              accentMode="first-last"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4 break-words"
              motionProps={{
                initial: { opacity: 0, y: 30 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.8 }
              }}
            />
          </div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Choose your domain and showcase your expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={track.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group"
            >
              <div className="bg-charcoal/50 backdrop-blur-sm border border-ancient-gold/30 rounded-xl p-6 sm:p-8 h-full hover:border-ancient-gold/60 transition-hover cursor-pointer overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-10 transition-hover`} />
                
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl mb-4">{track.icon}</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-ancient-gold mb-3">{track.name}</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{track.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Tracks

