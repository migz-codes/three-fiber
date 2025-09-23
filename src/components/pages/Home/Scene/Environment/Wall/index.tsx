import { RigidBody } from '@react-three/rapier'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import * as THREE from 'three'
import { globalStore } from '@/store'

export interface TWallProps {
  position: any
  rotation: any
}

export const Wall = ({ position, rotation }: TWallProps) => {
  const isDev = useAtomValue(globalStore.isDev)

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(50, 10, 4, 4)
    return geo
  }, [])

  return (
    <RigidBody type='fixed'>
      <mesh position={position} rotation={rotation} geometry={geometry}>
        <meshStandardMaterial wireframe={isDev} opacity={isDev ? 1 : 0} transparent />
      </mesh>
    </RigidBody>
  )
}
