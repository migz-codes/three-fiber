import { useThree } from '@react-three/fiber'
import { useAtomValue } from 'jotai'
import { type RefObject, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { globalStore } from '@/store'

export const useSpaceshipSounds = (
  spaceship: RefObject<THREE.Group<THREE.Object3DEventMap> | null>
) => {
  const audios = useAtomValue(globalStore.audioMapAtom)

  const { camera } = useThree()
  const enterSoundRef = useRef<THREE.PositionalAudio>(null)
  const musicSoundRef = useRef<THREE.PositionalAudio>(null)
  const hoveringSoundRef = useRef<THREE.PositionalAudio>(null)

  const playEnter = () => {
    if (!enterSoundRef.current) return

    enterSoundRef.current.play()
  }

  const playHovering = () => {
    if (!hoveringSoundRef.current) return

    hoveringSoundRef.current.play()
  }

  const playMusic = () => {
    if (!musicSoundRef.current) return

    musicSoundRef.current.play()
  }

  useEffect(() => {
    if (!audios.enter || !audios.hovering || !audios.music) return

    const listener = new THREE.AudioListener()
    camera.add(listener)

    const enterSound = new THREE.PositionalAudio(listener)
    enterSound.setBuffer(audios.enter)
    enterSound.setLoop(false)
    enterSound.setVolume(1)
    spaceship.current?.add(enterSound)
    enterSoundRef.current = enterSound

    const hoveringSound = new THREE.PositionalAudio(listener)
    hoveringSound.setBuffer(audios.hovering)
    hoveringSound.setLoop(true)
    hoveringSound.setVolume(0.1)
    hoveringSound.setRefDistance(50)
    hoveringSound.setRolloffFactor(2)
    hoveringSound.setMaxDistance(1000)
    spaceship.current?.add(hoveringSound)
    hoveringSoundRef.current = hoveringSound

    const musicSound = new THREE.PositionalAudio(listener)
    musicSound.setBuffer(audios.music)
    musicSound.setLoop(true)
    musicSound.setVolume(0.3)
    musicSound.setRefDistance(50)
    musicSound.setRolloffFactor(2)
    musicSound.setMaxDistance(1000)
    spaceship.current?.add(musicSound)
    musicSoundRef.current = musicSound

    return () => {
      camera.remove(listener)
      enterSound.disconnect()
      hoveringSound.disconnect()
      musicSound.disconnect()
    }
  }, [audios, camera, spaceship])

  return { playEnter, playHovering, playMusic }
}
