import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'

const referenceWidth = 2507
const referenceHeight = 925

interface TTransformProps {
  scale: number
  position: [number, number, number]
}

export const useResponsiveTransform = (params: TTransformProps) => {
  const { size } = useThree()

  return useMemo(() => {
    const scaleX = size.width / referenceWidth / params.scale
    const scaleY = size.height / referenceHeight / params.scale

    const scale = Math.min(scaleX, scaleY)

    const position: [number, number, number] = [
      (params.position[0] / referenceWidth) * size.width,
      (params.position[1] / referenceHeight) * size.height,
      params.position[2]
    ]

    return { scale, position }
  }, [size.width, size.height, params.position, params.scale])
}
