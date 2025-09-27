/** biome-ignore-all lint/a11y/noStaticElementInteractions: is 3D */

import { useEffect, useState } from 'react'
import { Model } from './Model'
import { Overlay } from './Overlay'

export const Spaceship = () => {
  const [isHovered, setIsHovered] = useState(false)

  const onModelPointerOut = () => setIsHovered(false)
  const onModelPointerOver = () => setIsHovered(true)

  useEffect(() => {
    document.body.style.cursor = isHovered ? 'pointer' : 'default'
  }, [isHovered])

  return (
    <>
      <Model
        isHovered={isHovered}
        onPointerOut={onModelPointerOut}
        onPointerOver={onModelPointerOver}
      />

      <Overlay />
    </>
  )
}
