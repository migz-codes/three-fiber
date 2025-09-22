import { useThree } from '@react-three/fiber'
import { type RefObject, useCallback, useEffect, useRef } from 'react'
import * as THREE from 'three'

export const useChestSounds = (chest: RefObject<THREE.Group<THREE.Object3DEventMap> | null>) => {
  const { camera } = useThree()
  const openSoundRef = useRef<THREE.PositionalAudio>(null)
  const tempSoundRef = useRef<THREE.PositionalAudio>(null)
  const closeSoundRef = useRef<THREE.PositionalAudio>(null)

  const playOpen = useCallback(() => {
    if (!openSoundRef.current) return

    openSoundRef.current.isPlaying ? openSoundRef.current.stop() : openSoundRef.current.play()
  }, [])

  const playClose = useCallback(() => {
    if (!closeSoundRef.current) return

    closeSoundRef.current.isPlaying ? closeSoundRef.current.stop() : closeSoundRef.current.play()
  }, [])

  const playTemp = useCallback(() => {
    if (!tempSoundRef.current) return

    tempSoundRef.current.isPlaying ? tempSoundRef.current.stop() : tempSoundRef.current.play()
  }, [])

  useEffect(() => {
    const loader = new THREE.AudioLoader()
    const listener = new THREE.AudioListener()
    const openSound = new THREE.PositionalAudio(listener)
    const tempSound = new THREE.PositionalAudio(listener)
    const closeSound = new THREE.PositionalAudio(listener)

    camera.add(listener)

    loader.load('/sounds/open-chest.wav', (buffer) => {
      openSound.setVolume(1)
      openSound.setBuffer(buffer)
      openSound.setRefDistance(3)
      openSoundRef.current = openSound

      chest.current?.add(openSound)
    })

    loader.load('/sounds/temp.wav', (buffer) => {
      tempSound.setVolume(1)
      tempSound.setBuffer(buffer)
      tempSound.setRefDistance(3)
      tempSoundRef.current = tempSound

      chest.current?.add(tempSound)
    })

    loader.load('/sounds/close-chest.wav', (buffer) => {
      closeSound.setVolume(0.5)
      closeSound.setBuffer(buffer)
      closeSound.setRefDistance(3)
      closeSoundRef.current = closeSound

      chest.current?.add(closeSound)
    })

    return () => {
      camera.remove(listener)
      openSound.disconnect()
      closeSound.disconnect()
    }
  }, [camera, chest])

  return { playOpen, playClose, playTemp }
}
