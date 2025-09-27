import { CameraControls, PerspectiveCamera, useAnimations, useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { useCallback, useEffect, useRef } from 'react'
import type * as THREE from 'three'
import { useResponsiveTransform } from '@/hooks/useResponsivePosition'
import type { TPrimitiveProps } from '@/types'
import { degToRad } from '@/utils/degToRad'

type TModelProps = TPrimitiveProps & { isHovered?: boolean }

export const Model = ({ isHovered, ...props }: TModelProps) => {
  const { camera } = useThree()
  const spaceship = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/models/spaceship_-_cb2.glb')

  const { actions } = useAnimations(animations, spaceship)

  const { scale, position } = useResponsiveTransform({
    scale: 1,
    position: [-10, -2, -40]
  })

  const setOptions = useCallback(() => {
    scene.traverse(() => {})
  }, [scene])

  const setAnimation = useCallback(() => {
    if (!actions || Object.keys(actions).length === 0) return

    const action = actions[Object.keys(actions)[0]]
    if (!action) return

    action.play()
    action.timeScale = isHovered ? 1 : 0.5
  }, [actions, isHovered])

  useEffect(() => {
    setOptions()
    setAnimation()

    if (spaceship.current) {
      spaceship.current.position.set(position[0], position[1], position[2])
      camera.add(spaceship.current)
    }

    return () => {
      if (spaceship.current) camera.remove(spaceship.current)
    }
  }, [setOptions, setAnimation, camera, position])

  return (
    <>
      <PerspectiveCamera makeDefault position={[400, 350, -30]} />

      <CameraControls enabled={false} />

      <primitive
        ref={spaceship}
        object={scene}
        rotation={[0, degToRad(-40), degToRad(-20)]}
        scale={scale}
        {...props}
      />
    </>
  )
}
