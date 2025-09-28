import { useEffect } from 'react'
import { useGlobalAudioLoader } from '@/hooks/useGlobalAudioLoader'
import { files } from '@/static/audios'

const total = Object.keys(files).length

export const Sounds = ({ onLoaded }: { onLoaded: () => void }) => {
  const { loadAudios, isLoading, isAllLoaded, loaded } = useGlobalAudioLoader()

  useEffect(() => {
    if (isAllLoaded) onLoaded()
  }, [isAllLoaded, onLoaded])

  return (
    <button
      type='button'
      onClick={loadAudios}
      disabled={isLoading}
      className='text-[24px] text-green-500/80 font-secondary bg-[#000]/50 py-2 px-4 rounded w-auto inline-block animate-pulse cursor-pointer pointer-events-auto'
    >
      {isLoading ? `loading audios (${loaded}/${total})` : 'click to start loading audio!'}
    </button>
  )
}
