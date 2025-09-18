import { RigidBody } from '@react-three/rapier'
import { useMemo } from 'react'
import * as THREE from 'three'
import { useARMTexturesWithDisplacement } from '@/hooks/useTextures'
import { degToRad } from '@/utils/degToRad'

export const Ground = () => {
  const { textures, applyUV2 } = useARMTexturesWithDisplacement({ name: 'terrain' })

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 10, 10)
    applyUV2(geo)
    return geo
  }, [applyUV2])

  return (
    <RigidBody type='fixed' name='ground' colliders={false}>
      <mesh receiveShadow position={[0, 0, 0]} rotation={[degToRad(-90), 0, 0]} geometry={geometry}>
        <meshStandardMaterial {...textures} />
      </mesh>
    </RigidBody>
  )
}
