'use client'

import { GizmoHelper, GizmoViewcube, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from 'three'

export const Cube = () => {
  const cube = useRef<THREE.Mesh>(null)

  // useFrame(() => {
  //   if (!cube.current) return

  //   cube.current.rotation.x += 0.05
  //   cube.current.rotation.y += 0.05
  //   cube.current.rotation.z += 0.05
  // })

  return (
    <mesh ref={cube}>
      <axesHelper args={[10]} />

      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color='#666cff' />
    </mesh>
  )
}

export const Content = () => (
  <main className='w-screen h-screen flex flex-col'>
    <Canvas className='bg-primary-500 w-[50%] h-full' camera={{ position: [2, 2, 2] }}>
      <gridHelper args={[10, 10, '#f00', '#fff']} />
      <GizmoHelper alignment='bottom-right' margin={[80, 80]} scale={100}>
        <GizmoViewcube />
      </GizmoHelper>

      <OrbitControls />
      <Cube />
      <directionalLight position={[2, 5, 1]} />
    </Canvas>
  </main>
)
