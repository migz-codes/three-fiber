import { RigidBody } from '@react-three/rapier'
import { useMemo } from 'react'
import * as THREE from 'three'
import { useARMTextures } from '@/hooks/useTextures'
import { degToRad } from '@/utils/degToRad'

export const Ground = () => {
  const { textures, applyUV2, makeRepeatable } = useARMTextures({ name: 'terrain' })

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(50, 50, 1, 1)
    applyUV2(geo)
    makeRepeatable(10, 10)
    return geo
  }, [applyUV2, makeRepeatable])

  return (
    <RigidBody type='fixed' name='ground'>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[degToRad(-90), 0, 0]} geometry={geometry}>
        <meshStandardMaterial {...textures} />
      </mesh>
    </RigidBody>
  )
}
