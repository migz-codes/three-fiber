import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { globalStore } from '@/store'

const files: Record<string, string> = {
  enter: '/sounds/spaceship-enter.wav',
  hovering: '/sounds/spaceship-hovering.wav'
}

export const useGlobalAudioLoader = () => {
  const setAudioMap = useSetAtom(globalStore.audioMapAtom)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const loader = new THREE.AudioLoader()
    setIsLoading(true)

    let loaded = 0
    const total = Object.keys(files).length
    const buffers: Record<string, AudioBuffer> = {}

    Object.entries(files).forEach(([key, url]) => {
      loader.load(url, (buffer) => {
        buffers[key] = buffer
        loaded++

        if (loaded === total) {
          setAudioMap(buffers)
          setIsLoading(false)
        }
      })
    })
  }, [setAudioMap])

  return { isLoading }
}
