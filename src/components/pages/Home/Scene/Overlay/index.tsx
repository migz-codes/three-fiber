import { AnimatePresence, type MotionProps, motion } from 'framer-motion'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { twMerge as tw } from 'tailwind-merge'
import { Settings } from '@/assets/icons/Settings'
import { globalStore } from '@/store'

const animations: MotionProps = {
  exit: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
  initial: { opacity: 0, x: 100 }
}

export const Overlay = () => {
  const [isDev, setIsDev] = useAtom(globalStore.isDev)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const onSettingsClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const onDevModeClick = () => {
    setIsDev(!isDev)
  }

  return (
    <aside className='min-w-[52px] fixed top-[0px] right-[0px] z-10 flex items-center justify-center flex-col rounded-bl-[8px] transition-all duration-500 ease-in-out overflow-hidden'>
      <button
        type='button'
        onClick={onSettingsClick}
        className='opacity-70 hover:opacity-100 flex items-center justify-center w-[52px] h-[52px] self-end relative z-10'
      >
        <Settings className='w-[24px] h-[24px] fill-[#fff]' />
      </button>

      {isMenuOpen && (
        <AnimatePresence>
          <motion.ul {...animations}>
            <li className='flex items-center justify-center relative z-10 p-[8px]'>
              <button
                type='button'
                onClick={onDevModeClick}
                className='text-[#fff] text-[16px] p-[8px]'
              >
                {isDev ? 'disable dev mode' : 'enable dev mode'}
              </button>
            </li>
          </motion.ul>
        </AnimatePresence>
      )}

      <div
        className={tw(
          'absolute top-[0px] right-[0px] bottom-[0px] left-[0px] bg-[#000] transition-opacity duration-500 ease-in-out',
          isMenuOpen ? 'opacity-50' : 'opacity-0'
        )}
      ></div>
    </aside>
  )
}
