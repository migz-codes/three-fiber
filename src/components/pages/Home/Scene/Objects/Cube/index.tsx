import { useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export const Cube = () => {
  const cube = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, '/textures/wood/diff.jpg')

  return (
    <mesh ref={cube} position={[10, 1.3, 0]} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color='#cabaa9' map={texture} />
    </mesh>
  )
}
