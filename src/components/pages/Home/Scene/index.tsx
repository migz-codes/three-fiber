'use client'

import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { controlsMap } from '@/static/controls'
import { Helpers } from './Helpers'
import { Loader } from './Loader'
import { Overlay } from './Overlay'
import { SpaceScene } from './SpaceScene'

export const Scene = () => (
  <main className='w-screen h-screen flex flex-row items-center justify-center'>
    <Overlay />

    <KeyboardControls map={controlsMap}>
      <Canvas shadows id='canvas' dpr={[1, 2]} className='bg-black w-full h-full border'>
        <Suspense fallback={<Loader />}>
          <SpaceScene />
          <Helpers />
        </Suspense>
      </Canvas>
    </KeyboardControls>
  </main>
)
