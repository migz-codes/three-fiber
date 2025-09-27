'use client'

import { KeyboardControls, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { controlsMap } from '@/static/controls'
import { Helpers } from './Helpers'
import { Lights } from './Lights'
import { Loader } from './Loader'
import { Objects } from './Objects'
import { Overlay } from './Overlay'

export const Scene = () => (
  <main className='w-screen h-screen flex flex-row items-center justify-center'>
    <Overlay />

    <KeyboardControls map={controlsMap}>
      <Canvas shadows id='canvas' dpr={[1, 2]} className='bg-black w-full h-full border'>
        <Suspense fallback={<Loader />}>
          <Physics>
            <Objects />
            <Helpers />
            <Lights />
          </Physics>
          <OrbitControls />
        </Suspense>
      </Canvas>
    </KeyboardControls>
  </main>
)
