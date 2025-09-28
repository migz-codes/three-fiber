import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { globalStore } from '@/store'
import { Sounds } from './Sounds'
import { Textures } from './Textures'

export const FullScreenLoader = () => {
  const [isLoading, setIsLoading] = useAtom(globalStore.isLoading)
  const [isTexturesLoaded, setisTexturesLoaded] = useState(false)
  const [isSoundsLoaded, setisSoundsLoaded] = useState(false)

  useEffect(() => {
    setIsLoading(!isTexturesLoaded || !isSoundsLoaded)
  }, [isTexturesLoaded, isSoundsLoaded, setIsLoading])

  if (!isLoading) return <></>

  return (
    <div className='bg-[#000]/80 fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[9999] flex items-center gap-y-[16px] justify-center border-2 border-green-500/80 pointer-events-auto flex-col'>
      <Textures onLoaded={() => setisTexturesLoaded(true)} />
      <Sounds onLoaded={() => setisSoundsLoaded(true)} />
    </div>
  )
}
