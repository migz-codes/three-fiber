/** biome-ignore-all lint/a11y/noStaticElementInteractions: is 3D */
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'
import { useChestAnimations } from './useChestAnimations'
import { useChestSounds } from './useChestSounds'

export const Chest = () => {
  const chest = useRef<THREE.Group>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { scene, animations } = useGLTF('/models/chest.glb')

  const sound = useChestSounds(chest)
  const animation = useChestAnimations(animations, chest)

  useEffect(() => {
    scene.traverse((child: any) => {
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

  return (
    <RigidBody type='fixed'>
      <primitive ref={chest} scale={0.01} object={scene} onClick={onClick} position={[0, 0.9, 0]} />
    </RigidBody>
  )
}

useGLTF.preload('/models/chest.glb')
