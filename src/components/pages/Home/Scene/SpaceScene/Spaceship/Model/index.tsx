/** biome-ignore-all lint/correctness/useExhaustiveDependencies: already verified by me and handled by react-compile */
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useAtomValue } from 'jotai'
import { memo, useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'
import { useResponsiveScale } from '@/hooks/useResponsive'
import { globalStore } from '@/store'
import { createCurve } from '@/utils/createCurve'
import { degToRad } from '@/utils/degToRad'
import { easeOutQuad } from '@/utils/ease'

type TModelProps = { isHovered?: boolean; onPointerOver?: () => void; onPointerOut?: () => void }

const bounceAnimationSpeed = 0.3
const hoverBounceAnimationSpeed = 1

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

  const attachCamera = () => {
    if (!spaceship.current) return

    camera.add(spaceship.current)
    spaceship.current.position.set(...initialPosition)
  }

  const detachCamera = () => {
    if (!spaceship.current) return

    camera.remove(spaceship.current)
  }

  const initialAnimation = () => {
    if (!spaceship.current || animationDoneRef.current) return

    const newTranslation = translation + 0.01
    const easedTranslation = easeOutQuad(Math.min(newTranslation, 1))

    spaceship.current.position.copy(curve.getPoint(easedTranslation))
    setTranslation(Math.min(newTranslation, 1))

    if (newTranslation >= 1) {
      animationDoneRef.current = true
      spaceship.current.position.copy(curve.getPoint(1))
    }
  }

  const hoverAnimation = () => {
    const action = actions[Object.keys(actions)[0]]

    if (!action) return

    action.timeScale = isHovered ? hoverBounceAnimationSpeed : bounceAnimationSpeed
  }

  const startBounceAnimation = () => {
    if (!actions || Object.keys(actions).length === 0) return

    const action = actions[Object.keys(actions)[0]]

    if (!action) return

    action.play()
    action.timeScale = bounceAnimationSpeed
  }

  const setMaterialOptions = () => {
    scene.traverse((child: THREE.Object3D) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        if (Array.isArray(mesh.material)) return
        const material = mesh.material as THREE.MeshStandardMaterial

        material.wireframe = isDev
      }
    })
  }

  useEffect(() => {
    hoverAnimation()
  }, [actions, isHovered])

  useEffect(() => {
    startBounceAnimation()
  }, [actions])

  useEffect(() => {
    setMaterialOptions()
  }, [isDev, scene])

  useEffect(() => {
    attachCamera()

    return () => {
      detachCamera()
    }
  }, [camera])

  useFrame(() => {
    initialAnimation()
  })

  return (
    <>
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
