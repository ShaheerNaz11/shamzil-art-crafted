import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [clicked, setClicked] = useState(false)

  // Use motion values for smoother, higher performance tracking
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Spring physics for the trailing aura
  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const auraX = useSpring(cursorX, springConfig)
  const auraY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const updateMousePosition = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      const isClickable = 
        ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || 
        target.closest('a') || 
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'

      setIsHovering(isClickable)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [cursorX, cursorY])

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Dynamic Glowing Aura */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        style={{ x: auraX, y: auraY }}
      >
        <motion.div
          className="absolute top-0 left-0 rounded-full"
          style={{ x: '-50%', y: '-50%' }}
          animate={{
            width: isHovering ? 60 : 36,
            height: isHovering ? 60 : 36,
            backgroundColor: isHovering ? 'rgba(147, 51, 234, 0.25)' : 'rgba(216, 180, 254, 0.4)',
            backdropFilter: 'blur(4px)',
            border: isHovering ? '1px solid rgba(147, 51, 234, 0.4)' : '1px solid rgba(216, 180, 254, 0.6)',
            boxShadow: isHovering ? '0 0 20px rgba(147, 51, 234, 0.5)' : '0 0 10px rgba(216, 180, 254, 0.3)',
            scale: clicked ? 0.8 : 1,
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>
      
      {/* Inner Spark Core */}
      <motion.div
        className="absolute top-0 left-0 pointer-events-none"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          className="absolute top-0 left-0 rounded-full"
          style={{ x: '-50%', y: '-50%' }}
          animate={{
            width: isHovering ? 4 : 8,
            height: isHovering ? 4 : 8,
            backgroundColor: isHovering ? '#c084fc' : '#7c3aed',
            boxShadow: isHovering ? '0 0 10px #c084fc' : '0 0 8px #7c3aed',
            scale: clicked ? 0.5 : 1,
          }}
          transition={{ duration: 0.2, type: 'tween', ease: 'easeOut' }}
        />
      </motion.div>
    </div>
  )
}
