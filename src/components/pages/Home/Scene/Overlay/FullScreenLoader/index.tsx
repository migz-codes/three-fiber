import { useProgress } from '@react-three/drei'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { globalStore } from '@/store'

export const FullScreenLoader = () => {
  const { progress } = useProgress()
  const setIsLoading = useSetAtom(globalStore.isLoading)

  useEffect(() => {
    setIsLoading(progress < 100)
  }, [progress, setIsLoading])

  if (progress >= 100) return <></>

  return (
    <div className='bg-[#000]/80 fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[9999] flex items-center justify-center border-2 border-green-500/80 pointer-events-auto'>
      <span className='text-[24px] text-green-500/80 font-secondary'>
        loading {progress.toFixed(0)}%
      </span>
    </div>
  )
}
