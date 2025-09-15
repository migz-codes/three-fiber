import { PerspectiveCamera, PointerLockControls } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const speed = 5
const eyeLevel = 1.6

export const Character = () => {
  const { camera } = useThree()
  const meshRef = useRef<THREE.Mesh>(null)

  const [keys, setKeys] = useState({
    w: false,
    a: false,
    s: false,
    d: false,
    c: false,
    shift: false
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys((oldKeys) => ({ ...oldKeys, [e.key.toLowerCase()]: true }))
    }

    const warnOnTabClose = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = '' // Required for some browsers to show the prompt
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys((oldKeys) => ({ ...oldKeys, [e.key.toLowerCase()]: false }))
    }

    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('beforeunload', warnOnTabClose)

    return () => {
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('beforeunload', warnOnTabClose)
    }
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return

    const moveDirection = new THREE.Vector3()
    const forward = new THREE.Vector3()
    const right = new THREE.Vector3()

    camera.getWorldDirection(forward)

    forward.y = 0
    forward.normalize()

    right.crossVectors(camera.up, forward)
    right.normalize()

    if (keys.w) moveDirection.add(forward)
    if (keys.s) moveDirection.addScaledVector(forward, -1)
    if (keys.a) moveDirection.add(right)
    if (keys.d) moveDirection.addScaledVector(right, -1)

    if (moveDirection.length() > 0) {
      moveDirection.normalize()

      const finalSpeed = keys.shift ? speed * 2 : speed

      meshRef.current.position.addScaledVector(moveDirection, finalSpeed * delta)
    }

    const finalEyeLevel = keys.c ? eyeLevel / 2 : eyeLevel

    camera.position.x = meshRef.current.position.x
    camera.position.y = meshRef.current.position.y + finalEyeLevel
    camera.position.z = meshRef.current.position.z
  })

  return (
    <>
      <mesh ref={meshRef} position={[0, 1, 0]} scale={0.5} castShadow>
        <boxGeometry args={[2, 10, 2]} />
        <meshPhongMaterial color='#ff0000' />
      </mesh>

      <PointerLockControls />

      <PerspectiveCamera makeDefault position={[0, 1.6, 0]} fov={80} />
    </>
  )
}
