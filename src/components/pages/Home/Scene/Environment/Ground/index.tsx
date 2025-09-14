import { useLoader } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { EXRLoader } from 'three/examples/jsm/Addons.js'

export interface TGroundProps {
  size: number
  depth: number
  height: number
}

export const Ground = ({ depth, size }: TGroundProps) => {
  const [diffuse, displacement] = useLoader(THREE.TextureLoader, [
    '/textures/terrain/diff.jpg',
    '/textures/terrain/disp.png'
  ])

  const [normal, roughness] = useLoader(EXRLoader, [
    '/textures/terrain/nor.exr',
    '/textures/terrain/rough.exr'
  ])

  const geometry = useMemo(
    () => new THREE.BoxGeometry(size, depth, size + depth, 64, 1, 64),
    [size, depth]
  )

  useEffect(() => {
    diffuse.colorSpace = THREE.SRGBColorSpace
  }, [diffuse])

  return (
    <mesh receiveShadow position={[0, 0, 0]} geometry={geometry}>
      <meshStandardMaterial
        map={diffuse}
        metalness={0}
        normalMap={normal}
        displacementScale={1}
        displacementBias={-0.05}
        roughnessMap={roughness}
        displacementMap={displacement}
      />
    </mesh>
  )
}
