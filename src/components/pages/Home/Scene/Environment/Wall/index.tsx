import { RigidBody } from '@react-three/rapier'
import { useMemo } from 'react'
import * as THREE from 'three'
import { useARMTextures } from '@/hooks/useTextures'

export interface TWallProps {
  size: number
  height: number
  depth: number
  position: any
  rotation?: any
}

export const Wall = ({ size, height, depth, position, rotation }: TWallProps) => {
  const { textures, applyUV2 } = useARMTextures({ name: '/rock' })

  const geometry = useMemo(() => {
    const geo = new THREE.BoxGeometry(size, height - depth, depth, 64, 10, 64)
    applyUV2(geo)
    return geo
  }, [size, height, depth, applyUV2])

  return (
    <RigidBody type='fixed'>
      <mesh receiveShadow position={position} rotation={rotation} geometry={geometry}>
        <meshStandardMaterial {...textures} />
      </mesh>
    </RigidBody>
  )
}
