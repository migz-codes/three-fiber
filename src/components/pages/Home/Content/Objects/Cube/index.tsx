import { useFrame, useLoader } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export const Cube = () => {
  const cube = useRef<THREE.Mesh>(null)
  const texture = useLoader(THREE.TextureLoader, '/textures/wood/diff.jpg')

  useFrame(() => {
    if (!cube.current) return

    cube.current.rotation.x += 0.01
    cube.current.rotation.y += 0.01
    cube.current.rotation.z += 0.01
  })

  return (
    <mesh ref={cube} position={[0, 3, 0]} castShadow>
      {/* <axesHelper args={[10]} /> */}

      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color='#cabaa9' map={texture} />
    </mesh>
  )
}
