/** biome-ignore-all lint/a11y/noStaticElementInteractions: is 3D */
import { useAnimations, useGLTF } from '@react-three/drei'
import { useCallback, useEffect, useRef } from 'react'
import type * as THREE from 'three'

export const Galaxy = () => {
  const spaceship = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/galaxy.glb')
  const { actions } = useAnimations(animations, spaceship)

  const setOptions = useCallback(() => {
    scene.traverse(() => {})
  }, [scene])

  const setAnimation = useCallback(() => {
    if (actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]]

      if (!action) return

      action.play()
      action.timeScale = 0.1
    }
  }, [actions])

  useEffect(() => {
    setOptions()
    setAnimation()
  }, [setOptions, setAnimation])

  return (
    <primitive
      ref={spaceship}
      scale={100}
      object={scene}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
    />
  )
}
