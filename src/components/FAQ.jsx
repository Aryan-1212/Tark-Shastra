import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import AncientHeading from './AncientHeading'

const FAQ = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'Who can participate?',
      answer: 'Students, professionals, and enthusiasts from any background are welcome. You can participate individually or in teams of up to 4 members.',
    },
    {
      question: 'Is there a registration fee?',
      answer: 'No, participation in Tark Shastra is completely free. We believe in making innovation accessible to everyone.',
    },
    {
      question: 'Do I need to have prior experience?',
      answer: 'Not at all! Whether you\'re a beginner or an experienced developer, this hackathon is for everyone. We have mentors to guide you throughout the event.',
    },
    {
      question: 'What should I bring?',
      answer: 'Bring your laptop, charger, and enthusiasm! For on-site participants, we\'ll provide food, beverages, and a comfortable workspace.',
    },
    {
      question: 'Can I work on a pre-existing project?',
      answer: 'No, all projects must be started fresh during the hackathon. However, you can use existing libraries, frameworks, and APIs.',
    },
    {
      question: 'How will projects be judged?',
      answer: 'Projects will be evaluated based on innovation, technical implementation, problem-solving approach, and presentation. Our panel of expert judges will review each submission.',
    },
    {
      question: 'Will there be mentors available?',
      answer: 'Yes! We have scheduled mentoring rounds where you can get guidance from industry experts. Mentors will be available throughout the event.',
    },
    {
      question: 'What if I have more questions?',
      answer: 'Feel free to reach out to us at contact@tarkshastra.com or join our Discord community for real-time support and updates.',
    },
  ]

  return (
    <section id="faq" ref={ref} className="py-20 px-4 relative">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <AncientHeading
            text="Frequently Asked Questions"
            variant="h2"
            accentMode="first-last"
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gradient mb-4"
            motionProps={{
              initial: { opacity: 0, y: 30 },
              animate: isInView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.8 }
            }}
          />
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Everything you need to know about Tark Shastra
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-charcoal/50 backdrop-blur-sm border border-ancient-gold/30 rounded-xl overflow-hidden hover:border-ancient-gold/60 transition-hover"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-4 sm:px-6 py-4 text-left flex items-center justify-between focus:outline-none"
              >
                <span className="text-base sm:text-lg font-semibold text-white pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 text-ancient-gold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 text-sm sm:text-base text-gray-300 leading-relaxed">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQ

