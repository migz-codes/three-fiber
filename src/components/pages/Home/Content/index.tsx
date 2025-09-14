'use client'

import { Canvas } from '@react-three/fiber'

export const Content = () => (
  <main className='w-screen h-screen flex flex-col'>
    <Canvas className='bg-primary-500 w-[50%] h-full' camera={{ position: [2, 2, 2] }}>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhongMaterial color='#666cff' />
        <directionalLight position={[2, 5, 1]} />
      </mesh>
    </Canvas>

    <Canvas className='bg-primary-500 w-full h-full' camera={{ position: [2, 2, 2] }}>
      <mesh>
        <sphereGeometry args={[1, 80, 80]} />
        <meshPhongMaterial color='#666cff' />
        <directionalLight position={[2, 5, 1]} />
      </mesh>
    </Canvas>
  </main>
)
