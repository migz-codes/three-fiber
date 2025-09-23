import { useHelper } from '@react-three/drei'
import { useAtomValue } from 'jotai'
import { useRef } from 'react'
import { PointLightHelper } from 'three'
import { globalStore } from '@/store'

export const PointsLight = () => {
  const isDev = useAtomValue(globalStore.isDev)

  const light = useRef<any>(null)
  const light2 = useRef<any>(null)

  useHelper(isDev ? light : null, PointLightHelper, 1, 'blue')
  useHelper(isDev ? light2 : null, PointLightHelper, 1, 'blue')

  return (
    <>
      <pointLight ref={light} position={[5, 10, 0]} intensity={80} />
      <pointLight ref={light2} position={[-5, 10, 0]} intensity={80} />
    </>
  )
}
