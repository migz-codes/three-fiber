'use client'

import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense } from 'react'
import { Cameras } from './Cameras'
import { Environment } from './Environment'
import { Helpers } from './Helpers'
import { Lights } from './Lights'
import { Loader } from './Loader'
import { Objects } from './Objects'
import { Sounds } from './Sounds'

export enum CharacterControls {
  Forward = 'forward',
  Sprint = 'sprint',
  Backward = 'backward',
  Left = 'left',
  Right = 'right',
  Crouch = 'crouch',
  Jump = 'jump',
  Reset = 'reset',
  Dev = 'Dev'
}

const controls = {
  [CharacterControls.Dev]: ['KeyY'],
  [CharacterControls.Reset]: ['KeyR'],
  [CharacterControls.Forward]: ['KeyW', 'ArrowUp'],
  [CharacterControls.Sprint]: ['ShiftLeft'],
  [CharacterControls.Backward]: ['KeyS', 'ArrowDown'],
  [CharacterControls.Left]: ['KeyA', 'ArrowLeft'],
  [CharacterControls.Right]: ['KeyD', 'ArrowRight'],
  [CharacterControls.Crouch]: ['ControlLeft', 'KeyC'],
  [CharacterControls.Jump]: ['Space']
}

const controlsMap = Object.entries(controls).map(([key, value]) => ({ name: key, keys: value }))

export const Scene = () => (
  <main className='w-screen h-screen flex flex-col'>
    <KeyboardControls map={controlsMap}>
      <Canvas shadows className='bg-primary-500 w-[50%] h-full'>
        <Suspense fallback={<Loader />}>
          <Physics debug>
            <Helpers />

            <Environment />

            <Objects />

            <Cameras />

            <Sounds />

            <Lights />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  </main>
)
