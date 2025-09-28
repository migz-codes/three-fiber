/** biome-ignore-all lint/correctness/useExhaustiveDependencies: already verified by me and handled by react-compile */
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'
import { useResponsivePosition, useResponsiveScale } from '@/hooks/useResponsive'
import { globalStore } from '@/store'
import { createCurve } from '@/utils/createCurve'
import { degToRad } from '@/utils/degToRad'
import { easeOutQuad } from '@/utils/ease'
import { FullScreenHtml } from '../../Overlay/FullScreenHtml'
import { useSpaceshipSounds } from './useSpaceshipSounds'

const bounceAnimationSpeed = 0.3
const hoverBounceAnimationSpeed = 1
const hoverText = 'Entrar na nave'

export const Spaceship = () => {
  const isDev = useAtomValue(globalStore.isDev)
  const [isStarted, setIsStarted] = useAtom(globalStore.isStarted)
  const setMouseOverlayText = useSetAtom(globalStore.mouseOverlayText)

  const { camera } = useThree()
  const animationDoneRef = useRef(false)
  const spaceship = useRef<THREE.Group>(null)
  const [translation, setTranslation] = useState(0)
  const { playEnter, playHovering } = useSpaceshipSounds(spaceship)
  const { position: finalPosition } = useResponsivePosition({ position: [-10, -2, -40] })
  const { position: initialPosition } = useResponsivePosition({ position: [-100, 100, -500] })

  const curve = createCurve(initialPosition, finalPosition, 50)

  const { scene, animations } = useGLTF('/models/spaceship_-_cb2.glb')
  const { actions } = useAnimations(animations, spaceship)
  const { scale } = useResponsiveScale({ scale: 1 })

  const [isHovered, setIsHovered] = useState(false)

  const onPointerOut = () => setIsHovered(false)

  const onPointerOver = () => setIsHovered(true)

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
    if (!spaceship.current || animationDoneRef.current || !isStarted) return

    const newTranslation = translation + 0.005
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

  const setHoverOverlay = () => {
    document.body.style.cursor = isHovered ? 'pointer' : 'default'
    setMouseOverlayText(isHovered ? hoverText : '')
  }

  const onPlay = () => {
    playEnter()
    playHovering()
    setIsStarted(true)
  }

  useEffect(() => {
    setHoverOverlay()
  }, [isHovered])

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
      {!isStarted && <FullScreenHtml onClick={onPlay} title='Começar experiência' />}

      <primitive
        object={scene}
        ref={spaceship}
        scale={scale}
        onPointerOut={onPointerOut}
        onPointerOver={onPointerOver}
        rotation={[0, degToRad(-40), degToRad(-20)]}
      />
    </>
  )
}
