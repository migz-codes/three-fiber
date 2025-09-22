import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { PointLightHelper } from 'three'

export const Spotlight = () => {
  const light = useRef<any>(null)

  useHelper(light, PointLightHelper, 1, 'blue')

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
