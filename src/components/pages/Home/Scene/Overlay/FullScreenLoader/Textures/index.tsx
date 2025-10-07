import { useProgress } from '@react-three/drei'
import { useEffect } from 'react'

export const Textures = ({ onLoaded }: { onLoaded: () => void }) => {
  const { progress } = useProgress()

  useEffect(() => {
    if (progress >= 100) onLoaded()
  }, [progress, onLoaded])

  return (
    <span className='text-[24px] text-[#37d2d5] font-secondary'>
      loading textures and models{' '}
      <strong className='text-[#ff781e] font-secondary text-[24px]'>{progress.toFixed(0)}%</strong>
    </span>
  )
}
