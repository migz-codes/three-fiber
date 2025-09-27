/** biome-ignore-all lint/a11y/noStaticElementInteractions: is 3D */
import { PerspectiveCamera, useAnimations, useGLTF } from '@react-three/drei'
import { useCallback, useEffect, useRef } from 'react'
import type * as THREE from 'three'
import { degToRad } from '@/utils/degToRad'

export const Spaceship = () => {
  const spaceship = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/spaceship_-_cb2.glb')
  const { actions } = useAnimations(animations, spaceship)

  const setOptions = useCallback(() => {
    scene.traverse(() => {})
  }, [scene])

  const setAnimation = useCallback(() => {
    if (actions && Object.keys(actions).length > 0) {
      const action = actions[Object.keys(actions)[0]]

      if (!action) return

      action.play()
      action.timeScale = 1
    }
  }, [actions])

  useEffect(() => {
    setOptions()
    setAnimation()
  }, [setOptions, setAnimation])

  return (
    <>
      <ambientLight intensity={10} />

      <primitive
        ref={spaceship}
        scale={1}
        object={scene}
        position={[340, 300, 0]}
        rotation={[0, degToRad(90), 0]}
      />

      <PerspectiveCamera makeDefault position={[400, 350, -30]} rotation={[0, 0, 0]} fov={50} />
    </>
  )
}
