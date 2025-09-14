'use client'

import { GizmoHelper, GizmoViewcube, OrbitControls, useHelper } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export const Spotlight = () => {
  const light = useRef<any>(null)

  useHelper(light, THREE.SpotLightHelper, 'orange')

  return <spotLight ref={light} position={[2, 5, 1]} intensity={80} angle={0.1} penumbra={1} />
}

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

      <Cube />

      <OrbitControls />

      <directionalLight position={[2, 5, 1]} />
      <Spotlight />
    </Canvas>
  </main>
)
