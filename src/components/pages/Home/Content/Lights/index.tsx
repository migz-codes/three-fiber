import { useHelper } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export const Spotlight = () => {
  const light = useRef<any>(null)

  useHelper(light, THREE.SpotLightHelper, 'orange')

  return (
    <spotLight
      castShadow
      ref={light}
      angle={0.6}
      penumbra={1}
      intensity={100}
      position={[3, 8, 5]}
    />
  )
}

export const AmbientLight = () => {
  const light = useRef<any>(null)
  const light2 = useRef<any>(null)

  useHelper(light, THREE.PointLightHelper)
  useHelper(light2, THREE.PointLightHelper)

  return (
    <>
      <pointLight ref={light} position={[5, 10, 0]} intensity={50} />
      <pointLight ref={light2} position={[-5, 10, 0]} intensity={50} />
    </>
  )
}

export const Lights = () => (
  <>
    <Spotlight />
    <AmbientLight />
  </>
)
