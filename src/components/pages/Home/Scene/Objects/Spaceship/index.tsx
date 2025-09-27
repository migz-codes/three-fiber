/** biome-ignore-all lint/a11y/noStaticElementInteractions: is 3D */

import { useCallback, useEffect, useState } from 'react'
import { Model } from './Model'

export const Spaceship = () => {
  const [isHovered, setIsHovered] = useState(false)

  const onModelPointerOver = useCallback(() => setIsHovered(true), [])

  const onModelPointerOut = useCallback(() => setIsHovered(false), [])

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
    </>
  )
}
