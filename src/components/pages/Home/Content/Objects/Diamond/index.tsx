import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import type * as THREE from 'three'
import { AudioListener, AudioLoader, PositionalAudio } from 'three'
import { degToRad } from '@/utils/degToRad'

export const Diamond = () => {
  const { camera } = useThree()
  const diamond = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/diamond.glb')
  const audioRef = useRef<THREE.PositionalAudio>(null)

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  useEffect(() => {
    const listener = new AudioListener()
    camera.add(listener)

    const sound = new PositionalAudio(listener)
    const audioLoader = new AudioLoader()

    audioLoader.load('/sounds/sword.wav', (buffer) => {
      sound.setBuffer(buffer)
      sound.setVolume(0.4)
      sound.setRefDistance(3)
      audioRef.current = sound

      if (diamond.current) diamond.current.add(sound)

      window.addEventListener('click', () => {
        sound.play()
      })
    })

    return () => {
      window.removeEventListener('click', () => {
        sound.stop()
      })
    }
  }, [camera])

  useFrame(() => {
    if (!diamond.current) return
    diamond.current.rotation.y += degToRad(1)
  })

  return <primitive ref={diamond} object={scene} scale={0.5} position={[0, 2.4, 0]} />
}
