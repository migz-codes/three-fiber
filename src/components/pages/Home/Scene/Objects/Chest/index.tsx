/** biome-ignore-all lint/a11y/noStaticElementInteractions: is 3D */
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useCallback, useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'
import { degToRad } from '@/utils/degToRad'
import { useChestAnimations } from './useChestAnimations'
import { useChestSounds } from './useChestSounds'

export const Chest = () => {
  const chest = useRef<THREE.Group>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { scene, animations } = useGLTF('/models/chest.glb')

  const sound = useChestSounds(chest)
  const animation = useChestAnimations(animations, chest)

  const setSceneOptions = useCallback(() => {
    scene.traverse((child: THREE.Object3D) => {
      child.castShadow = true
    })
  }, [scene])

  const onClick = () => {
    setIsOpen(!isOpen)

    if (isOpen) {
      animation.playClose()
      sound.playClose()
      return
    }

    animation.playOpen()
    sound.playOpen()
  }

  useEffect(() => setSceneOptions(), [setSceneOptions])

  return (
    <>
      <RigidBody type='fixed'>
        <primitive
          ref={chest}
          scale={0.01}
          object={scene}
          onClick={onClick}
          position={[-27.6, 2.5, -13.8]}
          rotation={[0, degToRad(-25), 0]}
        />
      </RigidBody>
    </>
  )
}

useGLTF.preload('/models/chest.glb')
