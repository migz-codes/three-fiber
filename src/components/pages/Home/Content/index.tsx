'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import type * as THREE from 'three'
import { Ambient } from './Ambient'
import { Helpers } from './Helpers'
import { Lights } from './Lights'

export const Cube = () => {
  const cube = useRef<THREE.Mesh>(null)

  // useFrame(() => {
  //   if (!cube.current) return

  //   cube.current.rotation.x += 0.05
  //   cube.current.rotation.y += 0.05
  //   cube.current.rotation.z += 0.05
  // })

  return (
    <mesh ref={cube} position={[0, 3, 0]} castShadow>
      {/* <axesHelper args={[10]} /> */}

      <boxGeometry args={[2, 2, 2]} />
      <meshPhongMaterial color='#666cff' />
    </mesh>
  )
}

export const Content = () => (
  <main className='w-screen h-screen flex flex-col'>
    <Canvas shadows camera={{ position: [2, 2, 2] }} className='bg-primary-500 w-[50%] h-full'>
      <Helpers />

      <Ambient />
      <Cube />

      <OrbitControls />
      <Lights />
    </Canvas>
  </main>
)
