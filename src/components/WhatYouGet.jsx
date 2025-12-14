import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import AncientHeading from './AncientHeading'

const WhatYouGet = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const benefits = [
    {
      title: 'Prize Pool',
      description: 'Win cash prizes worth ₹1,50,000',
      icon: '🏆',
      highlight: true,
    },
    {
      title: 'Certificates',
      description: 'Get recognized with participation certificates',
      icon: '📜',
    },
    {
      title: 'Mentorship',
      description: 'Learn from industry experts and mentors',
      icon: '👥',
    },
    {
      title: 'Networking',
      description: 'Connect with peers, sponsors, and industry leaders',
      icon: '🤝',
    },
    {
      title: 'Swags & Goodies',
      description: 'Exclusive hackathon merchandise and goodies',
      icon: '🎁',
    },
    {
      title: 'Workshops',
      description: 'Attend technical workshops and sessions',
      icon: '📚',
    },
  ]

  return (
    <section id="what-you-get" className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="px-2 overflow-hidden">
            <AncientHeading
              text="What You Get"
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
            Rewards and opportunities that make it worth your while
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`relative bg-charcoal/50 backdrop-blur-sm border rounded-xl p-6 sm:p-8 ${
                benefit.highlight
                  ? 'border-ancient-gold/60 glow-gold'
                  : 'border-ancient-gold/30 hover:border-ancient-gold/60'
              } transition-hover`}
            >
              {benefit.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-ancient-gold text-deep-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                  Featured
                </div>
              )}
              <div className="text-4xl sm:text-5xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-ancient-gold mb-3">{benefit.title}</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatYouGet

