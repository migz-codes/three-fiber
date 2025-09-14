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
  const [diffuse, displacement] = useLoader(THREE.TextureLoader, [
    '/textures/rock/diff.jpg',
    '/textures/rock/disp.png'
  ])

  const normal = useLoader(EXRLoader, '/textures/rock/nor.exr')
  const roughness = useLoader(EXRLoader, '/textures/rock/rough.exr')

  useEffect(() => {
    diffuse.colorSpace = THREE.SRGBColorSpace
  }, [diffuse])

  const geometry = useMemo(() => {
    return new THREE.BoxGeometry(size, height - depth, depth, 64, 10, 64)
  }, [size, height, depth])

  return (
    <mesh position={position} rotation={rotation} receiveShadow geometry={geometry}>
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
