import { useHelper } from '@react-three/drei'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'
import { PointLightHelper } from 'three'
import { globalStore } from '@/store'

export const Spotlight = () => {
  const isDev = useAtomValue(globalStore.isDev)

  const light = useRef<any>(null)

  useHelper(isDev ? light : null, PointLightHelper, 1, 'red')

  return (
    <spotLight
      castShadow
      ref={light}
      angle={0.6}
      penumbra={1}
      intensity={200}
      position={[5, 5, 10]}
    />
  )
}
