import { useThree } from '@react-three/fiber'
import { type RefObject, useEffect, useRef } from 'react'
import * as THREE from 'three'

export const useSpaceshipSounds = (
  spaceship: RefObject<THREE.Group<THREE.Object3DEventMap> | null>
) => {
  const { camera } = useThree()
  const enterSoundRef = useRef<THREE.PositionalAudio>(null)
  const hoveringSoundRef = useRef<THREE.PositionalAudio>(null)

  const playEnter = () => {
    if (!enterSoundRef.current) return

    enterSoundRef.current.play()
  }

  const playHovering = () => {
    if (!hoveringSoundRef.current) return

    hoveringSoundRef.current.play()
  }

  useEffect(() => {
    const loader = new THREE.AudioLoader()
    const listener = new THREE.AudioListener()
    const enterSound = new THREE.PositionalAudio(listener)
    const hoveringSound = new THREE.PositionalAudio(listener)

    camera.add(listener)

    loader.load('/sounds/spaceship-enter.wav', (buffer) => {
      enterSound.setVolume(1)
      enterSound.setLoop(false)
      enterSound.setBuffer(buffer)

      hoveringSound.setVolume(0.5)
      hoveringSound.setRefDistance(50)
      hoveringSound.setRolloffFactor(2)
      hoveringSound.setMaxDistance(1000)

      spaceship.current?.add(enterSound)
      enterSoundRef.current = enterSound
    })

    loader.load('/sounds/spaceship-hovering.wav', (buffer) => {
      hoveringSound.setLoop(true)
      hoveringSound.setBuffer(buffer)

      hoveringSound.setVolume(0.1)
      hoveringSound.setRefDistance(50)
      hoveringSound.setRolloffFactor(2)
      hoveringSound.setMaxDistance(1000)

      spaceship.current?.add(hoveringSound)
      hoveringSoundRef.current = hoveringSound
    })

    return () => {
      camera.remove(listener)
      enterSound.disconnect()
      hoveringSound.disconnect()
    }
  }, [camera, spaceship])

  return { playEnter, playHovering }
}
