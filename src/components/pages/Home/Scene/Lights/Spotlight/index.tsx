import { useRef } from 'react'

export const Spotlight = () => {
  const light = useRef<any>(null)

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
