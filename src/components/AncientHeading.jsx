import { motion } from 'framer-motion'

/**
 * AncientHeading Component
 * 
 * A reusable component for headings with ancient accent letters.
 * Applies pure ancient font to first/last letters or specific syllables.
 * 
 * @param {string} text - The heading text
 * @param {string} variant - Heading variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
 * @param {string} accentMode - 'first-last' | 'first' | 'last' | 'custom'
 * @param {number[]} accentIndices - Custom indices for accent letters (0-based)
 * @param {string[]} accentSyllables - Specific syllables to accent (e.g., ['Om', 'Shakti'])
 * @param {string} className - Additional CSS classes
 * @param {object} motionProps - Framer Motion props
 */
const AncientHeading = ({
  text,
  variant = 'h2',
  accentMode = 'first-last',
  accentIndices = [],
  accentSyllables = [],
  className = '',
  motionProps = {},
  ...props
}) => {
  // Determine which characters should be accented
  const getAccentIndices = () => {
    if (accentMode === 'custom' && accentIndices.length > 0) {
      return accentIndices
    }
    
    // Find first and last non-space characters
    const firstNonSpaceIndex = text.split('').findIndex(char => char !== ' ')
    const lastNonSpaceIndex = text.split('').reverse().findIndex(char => char !== ' ')
    const actualLastIndex = lastNonSpaceIndex !== -1 ? text.length - 1 - lastNonSpaceIndex : -1
    
    if (accentMode === 'first') {
      return firstNonSpaceIndex !== -1 ? [firstNonSpaceIndex] : []
    }
    
    if (accentMode === 'last') {
      return actualLastIndex !== -1 ? [actualLastIndex] : []
    }
    
    if (accentMode === 'first-last') {
      const indices = []
      if (firstNonSpaceIndex !== -1) indices.push(firstNonSpaceIndex)
      if (actualLastIndex !== -1 && actualLastIndex !== firstNonSpaceIndex) {
        indices.push(actualLastIndex)
      }
      return indices
    }
    
    // Handle accent syllables
    if (accentSyllables.length > 0) {
      const indices = []
      let searchText = text.toLowerCase()
      
      accentSyllables.forEach(syllable => {
        const lowerSyllable = syllable.toLowerCase()
        let startIndex = 0
        
        while (true) {
          const index = searchText.indexOf(lowerSyllable, startIndex)
          if (index === -1) break
          
          // Add all indices for this syllable
          for (let i = 0; i < syllable.length; i++) {
            indices.push(index + i)
          }
          
          startIndex = index + 1
        }
      })
      
      return [...new Set(indices)] // Remove duplicates
    }
    
    return []
  }

  const accentIndicesSet = new Set(getAccentIndices())
  
  // Split text into characters and apply accent styling
  const renderText = () => {
    return text.split('').map((char, index) => {
      const isAccent = accentIndicesSet.has(index)
      const isSpace = char === ' '
      
      if (isSpace) {
        return <span key={index}>{char}</span>
      }
      
      if (isAccent) {
        return (
          <span key={index} className="ancient-accent">
            {char}
          </span>
        )
      }
      
      return <span key={index}>{char}</span>
    })
  }

  const HeadingTag = variant
  const baseClasses = `font-ancient-serif ${className}`
  
  // If motion props are provided, wrap in motion component
  if (Object.keys(motionProps).length > 0) {
    // Safely access motion component
    const MotionHeading = motion[HeadingTag] || motion.div
    return (
      <MotionHeading
        className={baseClasses}
        {...motionProps}
        {...props}
        as={HeadingTag}
      >
        {renderText()}
      </MotionHeading>
    )
  }
  
  return (
    <HeadingTag className={baseClasses} {...props}>
      {renderText()}
    </HeadingTag>
  )
}

export default AncientHeading

