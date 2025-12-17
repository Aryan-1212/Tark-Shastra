import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { coreTeam, technicalTeam, managementTeam, volunteers } from '../data/teamData'
import AncientHeading from '../components/AncientHeading'
import ParticleSystem from '../components/ParticleSystem'

const TeamPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = [
    { id: 'core', name: 'Core Team', members: coreTeam, icon: '👑' },
    { id: 'technical', name: 'Technical Team', members: technicalTeam, icon: '💻' },
    { id: 'management', name: 'Management & Operations', members: managementTeam, icon: '📊' },
    { id: 'volunteers', name: 'Volunteers', members: volunteers, icon: '🤝' },
  ]

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(categoryId)
    }
  }

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)

  return (
    <div className="relative min-h-screen">
      <ParticleSystem />
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="container mx-auto px-4 pt-24 sm:pt-32 pb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center text-ancient-gold hover:text-saffron mb-8 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <div className="px-2 sm:px-4 overflow-hidden">
              <AncientHeading
                text="Team & Management"
                variant="h1"
                accentMode="first-last"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gradient mb-4 break-words"
              />
            </div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
              Click on a category to view team members
            </p>
          </motion.div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                onClick={() => handleCategoryClick(category.id)}
                layout
                className={`bg-charcoal/50 backdrop-blur-sm border-2 rounded-xl p-6 sm:p-8 text-center transition-hover ${
                  selectedCategory === category.id
                    ? 'border-ancient-gold glow-gold bg-charcoal/70'
                    : 'border-ancient-gold/30 hover:border-ancient-gold/60'
                }`}
              >
                <div className="text-4xl sm:text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-ancient-gold mb-2">{category.name}</h3>
                <p className="text-sm sm:text-base text-gray-300">{category.members.length} Members</p>
              </motion.button>
            ))}
          </div>

          {/* Member Cards */}
          <AnimatePresence>
            {selectedCategoryData && (
              <motion.div
                key={selectedCategory}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ 
                  duration: 0.25,
                  ease: [0.4, 0, 0.2, 1],
                  layout: { duration: 0.3 }
                }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: 0.05 }}
                  className="mb-8"
                >
                  <h2 className="text-3xl sm:text-4xl font-bold text-ancient-gold mb-8 text-center px-4">
                    {selectedCategoryData.name}
                  </h2>
                </motion.div>
                <motion.div 
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {selectedCategoryData.members.map((member, index) => (
                    <motion.div
                      key={member.name}
                      layout
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ 
                        duration: 0.25, 
                        delay: index * 0.02,
                        ease: [0.4, 0, 0.2, 1]
                      }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-charcoal/50 backdrop-blur-sm border border-ancient-gold/30 rounded-xl p-4 sm:p-6 text-center hover:border-ancient-gold/60 transition-hover glow-gold hover:glow-saffron"
                    >
                      <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-ancient-gold/50"
                      >
                        <img src={member.photo} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                      </motion.div>
                      <h4 className="text-lg sm:text-xl font-bold text-white mb-1">{member.name}</h4>
                      <p className="text-sm sm:text-base text-sandstone mb-4">{member.role}</p>
                      <div className="flex justify-center space-x-4">
                        <motion.a
                          href={member.linkedin}
                          whileHover={{ scale: 1.2, color: '#0077b5' }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          className="text-gray-400 hover:text-blue-400 transition-hover"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </motion.a>
                        <motion.a
                          href={member.github}
                          whileHover={{ scale: 1.2, color: '#fff' }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          className="text-gray-400 hover:text-white transition-hover"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </motion.a>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default TeamPage

