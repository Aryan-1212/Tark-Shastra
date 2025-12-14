import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import AncientHeading from './AncientHeading'

const Schedule = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const events = [
    {
      time: 'Day 1 - March 15',
      title: 'Opening Ceremony',
      description: 'Welcome address, keynote speeches, and team formation',
      timeDetail: '9:00 AM - 10:00 AM',
    },
    {
      time: 'Day 1 - March 15',
      title: 'Coding Phase Begins',
      description: 'Teams start working on their projects',
      timeDetail: '10:00 AM',
    },
    {
      time: 'Day 1 - March 15',
      title: 'Mentoring Round 1',
      description: 'First mentoring session with industry experts',
      timeDetail: '2:00 PM - 4:00 PM',
    },
    {
      time: 'Day 2 - March 16',
      title: 'Mentoring Round 2',
      description: 'Second mentoring session and progress check',
      timeDetail: '10:00 AM - 12:00 PM',
    },
    {
      time: 'Day 2 - March 16',
      title: 'Workshop Sessions',
      description: 'Technical workshops on various topics',
      timeDetail: '3:00 PM - 5:00 PM',
    },
    {
      time: 'Day 3 - March 17',
      title: 'Final Submission',
      description: 'Deadline for project submissions',
      timeDetail: '10:00 AM',
    },
    {
      time: 'Day 3 - March 17',
      title: 'Presentations & Judging',
      description: 'Teams present their projects to judges',
      timeDetail: '11:00 AM - 3:00 PM',
    },
    {
      time: 'Day 3 - March 17',
      title: 'Result & Prize Distribution',
      description: 'Announcement of winners and prize distribution ceremony',
      timeDetail: '4:00 PM - 6:00 PM',
    },
  ]

  return (
    <section id="schedule" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <AncientHeading
            text="Schedule"
            variant="h2"
            accentMode="first-last"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-4"
            motionProps={{
              initial: { opacity: 0, y: 30 },
              animate: isInView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.8 }
            }}
          />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your 48-hour journey from idea to innovation
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ancient-gold via-saffron to-burnt-orange transform md:-translate-x-1/2" />

          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-ancient-gold rounded-full border-4 border-deep-black transform md:-translate-x-1/2 z-10 glow-gold" />

                {/* Content card */}
                <div
                  className={`w-full md:w-5/12 ml-16 md:ml-0 ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-charcoal/50 backdrop-blur-sm border border-ancient-gold/30 rounded-xl p-4 sm:p-6 hover:border-ancient-gold/60 transition-hover"
                  >
                    <div className="text-xs sm:text-sm text-sandstone mb-2">{event.time}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-ancient-gold mb-2">{event.title}</h3>
                    <p className="text-sm sm:text-base text-gray-300 mb-2">{event.description}</p>
                    <div className="text-xs sm:text-sm text-saffron font-semibold">{event.timeDetail}</div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Schedule

