import { motion } from 'framer-motion'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { globalStore } from '@/store'

export const Content = () => {
  const mouseOverlayText = useAtomValue(globalStore.mouseOverlayText)

  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ x: mouse.x, y: mouse.y }}
      className='bg-[#000]/50 py-2 px-4 rounded w-auto inline-block -translate-x-1/2 -translate-y-[calc(100%+8px)] animate-pulse'
    >
      <span className='text-[24px] text-green-500/80 font-secondary'>
        {mouseOverlayText?.toLocaleLowerCase()}
      </span>
    </motion.div>
  )
}
