import { CameraControls, PerspectiveCamera, useAnimations, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useAtomValue } from 'jotai'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'
import { useResponsiveScale } from '@/hooks/useResponsivePosition'
import { globalStore } from '@/store'
import { createCurve } from '@/utils/createCurve'
import { degToRad } from '@/utils/degToRad'
import { easeOutQuad } from '@/utils/ease'
import { Lights } from './Lights'

type TModelProps = { isHovered?: boolean; onPointerOver?: () => void; onPointerOut?: () => void }

const finalPosition: [number, number, number] = [-10, -2, -40]
const initialPosition: [number, number, number] = [-100, 100, -500]

const curve = createCurve(initialPosition, finalPosition, 50)

export const Model = memo(({ isHovered, onPointerOver, onPointerOut }: TModelProps) => {
  const isDev = useAtomValue(globalStore.isDev)

  const { camera } = useThree()
  const animationDoneRef = useRef(false)
  const spaceship = useRef<THREE.Group>(null)
  const [translation, setTranslation] = useState(0)

  const { scene, animations } = useGLTF('/models/spaceship_-_cb2.glb')
  const { actions } = useAnimations(animations, spaceship)
  const { scale } = useResponsiveScale({ scale: 1 })

  const setOptions = useCallback(() => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        if (Array.isArray(mesh.material)) return
        if ('wireframe' in mesh.material) {
          ;(
            mesh.material as
              | THREE.MeshBasicMaterial
              | THREE.MeshStandardMaterial
              | THREE.MeshPhongMaterial
          ).wireframe = isDev
        }
      }
    })
  }, [scene, isDev])

  const setAnimation = useCallback(() => {
    if (!actions || Object.keys(actions).length === 0) return

    const action = actions[Object.keys(actions)[0]]

    if (!action) return

    action.play()
    action.timeScale = 0.5
  }, [actions])

  const attachToCamera = useCallback(() => {
    if (!spaceship.current) return

    camera.add(spaceship.current)
    spaceship.current.position.set(...initialPosition)
  }, [camera])

  const detachFromCamera = useCallback(() => {
    if (spaceship.current) camera.remove(spaceship.current)
  }, [camera])

  const initialAnimation = useCallback(() => {
    if (!spaceship.current || animationDoneRef.current) return

    const newTranslation = translation + 0.01
    const easedTranslation = easeOutQuad(Math.min(newTranslation, 1))

    spaceship.current.position.copy(curve.getPoint(easedTranslation))
    setTranslation(Math.min(newTranslation, 1))

    if (newTranslation >= 1) {
      animationDoneRef.current = true
      spaceship.current.position.copy(curve.getPoint(1))
    }
  }, [translation])

  const onHoverAnimation = useCallback(() => {
    const action = actions[Object.keys(actions)[0]]

    if (!action) return

    action.timeScale = isHovered ? 1 : 0.5
  }, [isHovered, actions])

  useFrame(() => {
    initialAnimation()
  })

  useEffect(() => {
    onHoverAnimation()
  }, [onHoverAnimation])

  useEffect(() => {
    setOptions()
    setAnimation()
    attachToCamera()

    return () => detachFromCamera()
  }, [setOptions, setAnimation, attachToCamera, detachFromCamera])

  return (
    <>
      <PerspectiveCamera makeDefault position={[400, 350, -30]}>
        <Lights />
      </PerspectiveCamera>

      <CameraControls enabled={false} />

      <primitive
        scale={scale}
        object={scene}
        ref={spaceship}
        onPointerOut={onPointerOut}
        onPointerOver={onPointerOver}
        rotation={[0, degToRad(-40), degToRad(-20)]}
      />
    </>
  )
})
