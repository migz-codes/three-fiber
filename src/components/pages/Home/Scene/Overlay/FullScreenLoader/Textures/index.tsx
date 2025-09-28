import { useProgress } from '@react-three/drei'
import { useEffect } from 'react'

export const Textures = ({ onLoaded }: { onLoaded: () => void }) => {
  const { progress } = useProgress()

  useEffect(() => {
    if (progress >= 100) onLoaded()
  }, [progress, onLoaded])

  return (
    <span className='text-[24px] text-green-500/80 font-secondary'>
      loading textures and models {progress.toFixed(0)}%
    </span>
  )
}
