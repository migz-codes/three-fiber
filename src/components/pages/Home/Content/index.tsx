'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from 'three'

export const Cube = () => {
  const cube = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (!cube.current) return

    cube.current.rotation.x += 0.05
    cube.current.rotation.y += 0.05
    cube.current.rotation.z += 0.05
  })

  return (
    <mesh ref={cube}>
      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color='#666cff' />
    </mesh>
  )
}

export const Content = () => (
  <main className='w-screen h-screen flex flex-col'>
    <Canvas className='bg-primary-500 w-[50%] h-full' camera={{ position: [2, 2, 2] }}>
      <Cube />

      <directionalLight position={[2, 5, 1]} />
    </Canvas>
  </main>
)
