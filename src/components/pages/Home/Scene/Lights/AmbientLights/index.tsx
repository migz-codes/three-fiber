import { useHelper } from '@react-three/drei'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'
import { DirectionalLightHelper } from 'three'
import { globalStore } from '@/store'

export const AmbientLights = () => {
  const isDev = useAtomValue(globalStore.isDev)

  const light = useRef<any>(null)
  const light2 = useRef<any>(null)

  useHelper(isDev ? light : null, DirectionalLightHelper, 1, 'green')
  useHelper(isDev ? light2 : null, DirectionalLightHelper, 1, 'green')

  if (!isDev) return <></>

  return (
    <>
      <directionalLight intensity={0.5} ref={light} position={[-25, 25, 0]} />
      <directionalLight intensity={0.5} ref={light2} position={[25, 25, 0]} />
    </>
  )
}
