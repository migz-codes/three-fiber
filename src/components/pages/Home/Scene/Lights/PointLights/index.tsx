import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import { PointLightHelper } from 'three'

export const PointsLight = () => {
  const light = useRef<any>(null)
  const light2 = useRef<any>(null)

  useHelper(light, PointLightHelper, 1, 'red')
  useHelper(light2, PointLightHelper, 1, 'blue')

  return (
    <>
      <pointLight ref={light} position={[5, 10, 0]} intensity={80} />
      <pointLight ref={light2} position={[-5, 10, 0]} intensity={80} />
    </>
  )
}
