import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false)
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  const navItems = [
    { name: 'About', href: '/#about', isHash: true },
    { name: 'Tracks', href: '/#tracks', isHash: true },
    { name: 'Schedule', href: '/#schedule', isHash: true },
    { name: 'Team', href: '/#team', isHash: true },
    { name: 'FAQ', href: '/#faq', isHash: true },
  ]

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-gradient"
            >
              Tark Shastra
            </motion.div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => {
              const Component = item.isHash ? 'a' : Link
              const props = item.isHash 
                ? { href: item.href }
                : { to: item.href }
              
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Component
                    {...props}
                    className={`text-white hover:text-ancient-gold transition-colors ${
                      location.pathname === item.href ? 'text-ancient-gold' : ''
                    }`}
                  >
                    {item.name}
                  </Component>
                </motion.div>
              )
            })}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="px-6 py-2 bg-gradient-to-r from-ancient-gold to-saffron text-deep-black rounded-lg font-semibold glow-gold transition-hover"
            >
              Register
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-ancient-gold/20 bg-charcoal/80 backdrop-blur-md"
          >
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => {
                const Component = item.isHash ? 'a' : Link
                const props = item.isHash 
                  ? { href: item.href }
                  : { to: item.href }
                
                return (
                  <Component
                    key={item.name}
                    {...props}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white hover:text-ancient-gold transition-hover py-2"
                  >
                    {item.name}
                  </Component>
                )
              })}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-ancient-gold to-saffron text-deep-black rounded-lg font-semibold w-full"
              >
                Register
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar

