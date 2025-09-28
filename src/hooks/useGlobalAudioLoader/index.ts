import { useAtom } from 'jotai'
import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import { files } from '@/static/audios'
import { globalStore } from '@/store'

export const useGlobalAudioLoader = () => {
  const [audioMap, setAudioMap] = useAtom(globalStore.audioMapAtom)

  const [loadedState, setLoaded] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const loadAudios = () => {
    setIsLoading(true)

    const loader = new THREE.AudioLoader()
    const total = Object.keys(files).length
    const buffers: Record<string, AudioBuffer> = {}

    let loaded = 0
    Object.entries(files).forEach(([key, url]) => {
      loader.load(url, (buffer) => {
        buffers[key] = buffer
        setLoaded(loaded + 1)
        loaded++

        if (loaded === total) setAudioMap(buffers)
      })
    })
  }

  const isAllLoaded = useMemo(
    () => Object.keys(audioMap).length === Object.keys(files).length,
    [audioMap]
  )

  useEffect(() => {
    if (isAllLoaded) setIsLoading(false)
  }, [isAllLoaded])

  return { isLoading, loadAudios, loaded: loadedState, isAllLoaded }
}
