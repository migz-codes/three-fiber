import { AnimatePresence, type MotionProps, motion } from 'framer-motion'
import { useState } from 'react'
import { twMerge as tw } from 'tailwind-merge'
import { Settings as SettingsIcon } from '@/assets/icons/Settings'
import { DevMode } from './DevMode'
import { GizmaHelper } from './GizmaHelper'

const animations: MotionProps = {
  exit: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
  initial: { opacity: 0, x: 100 }
}

export const Settings = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const onSettingsClick = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <aside
      className={tw(
        'min-w-[52px] fixed top-[0px] right-[0px] z-10 flex items-center justify-center flex-col rounded-bl-[8px] transition-all duration-500 ease-in-out overflow-hidden',
        isMenuOpen ? 'border-l border-b border-[#79797971]' : 'border border-transparent'
      )}
    >
      <button
        type='button'
        onClick={onSettingsClick}
        className='opacity-70 hover:opacity-100 flex items-center justify-center w-[52px] h-[52px] self-end relative z-10'
      >
        <SettingsIcon className='w-[24px] h-[24px] fill-[#fff]' />
      </button>

      {isMenuOpen && (
        <AnimatePresence>
          <motion.ul className='w-[200px]' {...animations}>
            <DevMode />
            <GizmaHelper />
          </motion.ul>
        </AnimatePresence>
      )}

      <div
        className={tw(
          'absolute top-[0px] right-[0px] bottom-[0px] bg-[#000] left-[0px] transition-all duration-300 ease-in-out',
          isMenuOpen ? 'opacity-50' : 'opacity-0'
        )}
      />
    </aside>
  )
}
