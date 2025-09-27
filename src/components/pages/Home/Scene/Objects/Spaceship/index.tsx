/** biome-ignore-all lint/a11y/noStaticElementInteractions: is 3D */

import { useEffect, useState } from 'react'
import { Model } from './Model'

export const Spaceship = () => {
  const [isHovered, setIsHovered] = useState(false)

  const onModelPointerOver = () => setIsHovered(true)

  const onModelPointerOut = () => setIsHovered(false)

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'default'
  }, [isHovered])

  return (
    <>
      <ambientLight intensity={10} />

      <Model
        isHovered={isHovered}
        onPointerOut={onModelPointerOut}
        onPointerOver={onModelPointerOver}
      />
    </>
  )
}
