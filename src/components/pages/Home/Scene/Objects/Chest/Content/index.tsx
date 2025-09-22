import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'

export interface TFullscreenPlane {
  textureUrl: string
  visible: boolean
}

export const FullscreenPlane = ({ textureUrl, visible }: TFullscreenPlane) => {
  const { camera } = useThree()
  const texture = useTexture(textureUrl)
  const [scale, setScale] = useState(0.1)
  const planeRef = useRef<THREE.Mesh>(null)

  useFrame((_state, delta) => {
    if (!visible || !planeRef.current) return

    setScale((prev) => Math.min(prev + delta * 2, 5))

    const distance = 2
    const vector = new THREE.Vector3(0, 0, -distance)

    vector.applyQuaternion(camera.quaternion)
    vector.add(camera.position)

    planeRef.current.position.copy(vector)
    planeRef.current.quaternion.copy(camera.quaternion)
    planeRef.current.scale.set(scale, scale, scale)
  })

  return (
    <mesh ref={planeRef} visible={visible}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial map={texture} transparent />
    </mesh>
  )
}
