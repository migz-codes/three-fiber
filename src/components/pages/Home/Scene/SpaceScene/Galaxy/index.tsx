/** biome-ignore-all lint/a11y/noStaticElementInteractions: is 3D */
import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import type * as THREE from 'three'

export const Galaxy = () => {
  const galaxy = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/galaxy.glb')
  const { actions } = useAnimations(animations, galaxy)

  useEffect(() => {
    const startAnimation = () => {
      if (!actions || Object.keys(actions).length === 0) return

      const action = actions[Object.keys(actions)[0]]

      if (!action) return

      action.play()
      action.timeScale = 0.1
    }

    startAnimation()
  }, [actions])

  return (
    <primitive ref={galaxy} scale={100} object={scene} position={[0, 0, 0]} rotation={[0, 0, 0]} />
  )
}
