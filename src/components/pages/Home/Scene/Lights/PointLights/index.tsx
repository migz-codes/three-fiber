import { useRef } from 'react'

export const PointsLight = () => {
  const light = useRef<any>(null)
  const light2 = useRef<any>(null)

  return (
    <>
      <pointLight ref={light} position={[5, 10, 0]} intensity={80} />
      <pointLight ref={light2} position={[-5, 10, 0]} intensity={80} />
    </>
  )
}
