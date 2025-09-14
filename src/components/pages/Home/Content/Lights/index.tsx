import { useRef } from 'react'

export const Spotlight = () => {
  const light = useRef<any>(null)

  // useHelper(light, THREE.SpotLightHelper, 'orange')

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

export const AmbientLight = () => {
  const light = useRef<any>(null)
  const light2 = useRef<any>(null)

  // useHelper(light, THREE.PointLightHelper)
  // useHelper(light2, THREE.PointLightHelper)

  return (
    <>
      <pointLight ref={light} position={[5, 10, 0]} intensity={80} />
      <pointLight ref={light2} position={[-5, 10, 0]} intensity={80} />
    </>
  )
}

export const Lights = () => (
  <>
    <Spotlight />
    <AmbientLight />
  </>
)
