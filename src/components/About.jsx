import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import AncientHeading from './AncientHeading'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const cards = [
    {
      title: 'Our Vision',
      description: 'To bridge the gap between ancient Indian wisdom and cutting-edge technology, creating solutions that honor tradition while embracing innovation.',
      icon: '🎯',
    },
    {
      title: 'Our Mission',
      description: 'Empower developers and innovators to build meaningful solutions that address real-world challenges through collaborative coding and creative problem-solving.',
      icon: '🚀',
    },
    {
      title: 'Why Tark Shastra?',
      description: 'We believe in the power of combining timeless knowledge with modern tools. This hackathon celebrates both heritage and progress, creating a unique space for innovation.',
      icon: '✨',
    },
  ]

  return (
    <section id="about" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="px-2 overflow-hidden">
            <AncientHeading
              text="About the Hackathon"
              variant="h2"
              accentMode="first-last"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gradient mb-4"
              style={{ whiteSpace: 'nowrap' }}
              motionProps={{
                initial: { opacity: 0, y: 30 },
                animate: isInView ? { opacity: 1, y: 0 } : {},
                transition: { duration: 0.8 }
              }}
            />
          </div>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            A 24-hour coding marathon where innovation meets tradition, and ideas transform into reality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ scale: 1.02 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring", 
                stiffness: 300, 
                damping: 20 
              }}
              className="bg-charcoal/50 backdrop-blur-sm border border-ancient-gold/30 rounded-xl p-6 sm:p-8 hover:border-ancient-gold/60 transition-hover glow-gold hover:glow-saffron"
            >
              <div className="text-4xl sm:text-5xl mb-4">{card.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-ancient-gold mb-4">{card.title}</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About

