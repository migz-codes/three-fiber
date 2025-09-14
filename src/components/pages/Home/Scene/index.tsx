'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Cameras } from './Cameras'
import { Environment } from './Environment'
import { Helpers } from './Helpers'
import { Lights } from './Lights'
import { Loader } from './Loader'
import { Objects } from './Objects'
import { Sounds } from './Sounds'

export const Scene = () => (
  <main className='w-screen h-screen flex flex-col'>
    <Canvas shadows camera={{ position: [2, 2, 2] }} className='bg-primary-500 w-[50%] h-full'>
      <Suspense fallback={<Loader />}>
        <Helpers />

        <Environment />

        <Objects />

        <Cameras />

        <Sounds />

        <Lights />
      </Suspense>
    </Canvas>
  </main>
)
