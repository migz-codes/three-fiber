import { PerspectiveCamera, PointerLockControls, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, type RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import * as THREE from 'three'
import { CharacterControls } from '../..'

const speed = 5
const eyeLevel = 2
const capsuleRadius = 1

export const Character = () => {
  const isOnFloor = useRef<boolean>(false)
  const bodyRef = useRef<RapierRigidBody>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  const jumpPressed = useKeyboardControls((state) => state[CharacterControls.Jump])
  const leftPressed = useKeyboardControls((state) => state[CharacterControls.Left])
  const rightPressed = useKeyboardControls((state) => state[CharacterControls.Right])
  const resetPressed = useKeyboardControls((state) => state[CharacterControls.Reset])
  const sprintPressed = useKeyboardControls((state) => state[CharacterControls.Sprint])
  const forwardPressed = useKeyboardControls((state) => state[CharacterControls.Forward])
  const backwardPressed = useKeyboardControls((state) => state[CharacterControls.Backward])

  const onCollisionEnter = ({ other }: { other: any }) => {
    if (other.rigidBodyObject?.name === 'ground') isOnFloor.current = true
  }

  const onCollisionExit = ({ other }: { other: any }) => {
    if (other.rigidBodyObject?.name === 'ground') isOnFloor.current = false
  }

  const movements = () => {
    if (!bodyRef.current || !cameraRef.current) return

    const move = new THREE.Vector3()
    const camDir = new THREE.Vector3()
    const camRight = new THREE.Vector3()

    const vel = bodyRef.current.linvel()
    const finalSpeed = sprintPressed ? speed * 4 : speed

    cameraRef.current.getWorldDirection(camDir)
    camDir.y = 0
    camDir.normalize()
    camRight.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize()

    if (forwardPressed) move.add(camDir)
    if (backwardPressed) move.sub(camDir)
    if (leftPressed) move.sub(camRight)
    if (rightPressed) move.add(camRight)

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(finalSpeed)
      bodyRef.current.setLinvel({ x: move.x, y: vel.y, z: move.z }, true)
    } else bodyRef.current.setLinvel({ x: 0, y: vel.y, z: 0 }, true)

    if (jumpPressed && isOnFloor.current) bodyRef.current.applyImpulse({ x: 0, y: 70, z: 0 }, true)
  }

  const resetPosition = () => {
    if (!resetPressed || !bodyRef.current) return

    bodyRef.current.setTranslation({ x: 0, y: 20, z: 0 }, true)
  }

  const attachCamera = () => {
    if (!bodyRef.current || !cameraRef.current) return

    cameraRef.current.position.x = bodyRef.current.translation().x
    cameraRef.current.position.y = bodyRef.current.translation().y + eyeLevel
    cameraRef.current.position.z = bodyRef.current.translation().z
  }

  useFrame(() => {
    movements()
    resetPosition()
    attachCamera()
  })

  return (
    <>
      <RigidBody
        ref={bodyRef}
        name='character'
        colliders={false}
        enabledRotations={[false, false, false]}
        onCollisionEnter={onCollisionEnter}
        onCollisionExit={onCollisionExit}
      >
        <mesh position={[0, 20, 0]} />

        <CapsuleCollider args={[eyeLevel / 2, capsuleRadius]} />
      </RigidBody>

      <PointerLockControls attach='camera' />
      <PerspectiveCamera makeDefault ref={cameraRef} fov={75} name='camera' />
    </>
  )
}
