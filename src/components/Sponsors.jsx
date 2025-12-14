import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import AncientHeading from './AncientHeading'

const Sponsors = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Placeholder sponsors (6 placeholders)
  const sponsorPlaceholders = Array.from({ length: 6 }, (_, i) => i + 1)

  return (
    <section id="sponsors" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <AncientHeading
            text="Sponsors"
            variant="h2"
            accentMode="first-last"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-4"
            motionProps={{
              initial: { opacity: 0, y: 30 },
              animate: isInView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.8 }
            }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-xl text-saffron font-semibold mb-8"
          >
            To Be Announced
          </motion.p>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            We're grateful to our sponsors who make this event possible
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sponsorPlaceholders.map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-charcoal/50 backdrop-blur-sm border-2 border-dashed border-ancient-gold/30 rounded-xl p-8 flex items-center justify-center hover:border-ancient-gold/60 transition-hover min-h-[120px]"
            >
              <div className="text-center">
                <div className="text-3xl text-ancient-gold/50 mb-2">🏢</div>
                <div className="text-sm text-gray-500">Sponsor Logo</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sponsors

