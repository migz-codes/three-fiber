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
  <main className='w-screen h-screen flex flex-col'>
    <Overlay />

    <KeyboardControls map={controlsMap}>
      <Canvas
        shadows
        className='bg-black w-[50%] h-full'
        id='canvas'
        camera={{
          position: [0, 5, 10],
          near: 0.1,
          far: 5000 // increase this
        }}
      >
        <Suspense fallback={<Loader />}>
          <Physics>
            <Helpers />
            {/* <Environment /> */}
            <Objects />
            {/* <Sounds /> */}
            <Lights />
          </Physics>
          <OrbitControls />
        </Suspense>
      </Canvas>
    </KeyboardControls>
  </main>
)
