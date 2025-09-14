import { useLoader } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { EXRLoader } from 'three/examples/jsm/Addons.js'

export interface TWallProps {
  size: number
  height: number
  depth: number
  position: any
  rotation?: any
}

export const Wall = ({ size, height, depth, position, rotation }: TWallProps) => {
  const [normal, roughness] = useLoader(EXRLoader, [
    '/textures/rock/nor.exr',
    '/textures/rock/rough.exr'
  ])

  const [diffuse, displacement] = useLoader(THREE.TextureLoader, [
    '/textures/rock/diff.jpg',
    '/textures/rock/disp.png'
  ])

  const geometry = useMemo(
    () => new THREE.BoxGeometry(size, height - depth, depth, 64, 10, 64),
    [size, height, depth]
  )

  useEffect(() => {
    diffuse.colorSpace = THREE.SRGBColorSpace
  }, [diffuse])

  return (
    <mesh receiveShadow position={position} rotation={rotation} geometry={geometry}>
      <meshStandardMaterial
        metalness={0}
        map={diffuse}
        normalMap={normal}
        displacementScale={0.1}
        displacementBias={-0.05}
        roughnessMap={roughness}
        displacementMap={displacement}
      />
    </mesh>
  )
}
