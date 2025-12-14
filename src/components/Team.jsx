import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { coreTeam, technicalTeam, managementTeam, volunteers } from '../data/teamData'
import AncientHeading from './AncientHeading'

const TeamSection = ({ title, members, delay = 0 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="mb-16">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay }}
        className="text-3xl md:text-4xl font-bold text-ancient-gold mb-8 text-center"
      >
        {title}
      </motion.h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: delay + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-charcoal/50 backdrop-blur-sm border border-ancient-gold/30 rounded-xl p-6 text-center hover:border-ancient-gold/60 transition-all glow-gold hover:glow-saffron"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-ancient-gold/50"
            >
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            </motion.div>
            <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
            <p className="text-sandstone mb-4">{member.role}</p>
            <div className="flex justify-center space-x-4">
              <motion.a
                href={member.linkedin}
                whileHover={{ scale: 1.2, color: '#0077b5' }}
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              <motion.a
                href={member.github}
                whileHover={{ scale: 1.2, color: '#fff' }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const Team = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="team" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="px-2 overflow-hidden">
            <AncientHeading
              text="Team & Management"
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
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the passionate people behind Tark Shastra
          </p>
        </motion.div>

        <TeamSection title="Core Team" members={coreTeam} delay={0.2} />
        <TeamSection title="Technical Team" members={technicalTeam} delay={0.4} />
        <TeamSection title="Management & Operations" members={managementTeam} delay={0.6} />
        <TeamSection title="Volunteers" members={volunteers} delay={0.8} />
      </div>
    </section>
  )
}

export default Team

