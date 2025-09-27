import { useThree } from '@react-three/fiber'
import { useMemo } from 'react'

const referenceWidth = 2507
const referenceHeight = 925

type TResponsiveScaleProps = {
  scale: number
}

type TResponsivePositionProps = {
  position: [number, number, number]
}

export const useResponsiveScale = ({ scale }: TResponsiveScaleProps) => {
  const { size } = useThree()

  return useMemo(() => {
    const scaleX = size.width / referenceWidth / scale
    const scaleY = size.height / referenceHeight / scale

    return { scale: Math.min(scaleX, scaleY) }
  }, [size.width, size.height, scale])
}

export const useResponsivePosition = ({ position }: TResponsivePositionProps) => {
  const { size } = useThree()

  return useMemo(
    () => ({
      position: [
        (position[0] / referenceWidth) * size.width,
        (position[1] / referenceHeight) * size.height,
        position[2]
      ]
    }),
    [size.width, size.height, position]
  )
}
