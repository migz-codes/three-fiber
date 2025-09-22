'use client'

import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { controlsMap } from '@/static/controls'
import { Environment } from './Environment'
import { Helpers } from './Helpers'
import { Lights } from './Lights'
import { Loader } from './Loader'
import { Objects } from './Objects'
import { Overlay } from './Overlay'
import { Sounds } from './Sounds'

export const Scene = () => (
  <main className='w-screen h-screen flex flex-col'>
    <Overlay />

    <KeyboardControls map={controlsMap}>
      <Canvas shadows className='bg-black w-[50%] h-full' id='canvas'>
        <Suspense fallback={<Loader />}>
          <Physics>
            <Helpers />
            <Environment />
            <Objects />
            <Sounds />
            <Lights />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  </main>
)
