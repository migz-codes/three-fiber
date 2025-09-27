import { useHelper } from '@react-three/drei'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'
import * as THREE from 'three'
import { globalStore } from '@/store'

export const Lights = () => {
  const isDev = useAtomValue(globalStore.isDev)

  const light = useRef<any>(null)
  const light2 = useRef<any>(null)

  useHelper(isDev ? light : null, THREE.PointLightHelper, 1, 'blue')
  useHelper(isDev ? light2 : null, THREE.PointLightHelper, 1, 'green')

  return (
    <>
      <pointLight ref={light} position={[0, 0, -4]} intensity={8000} />
      <pointLight ref={light2} position={[0, 0, -100]} intensity={10000} />
    </>
  )
}
