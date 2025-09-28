import { useThree } from '@react-three/fiber'

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

  const scaleX = size.width / referenceWidth / scale
  const scaleY = size.height / referenceHeight / scale

  return { scale: Math.min(scaleX, scaleY) as number }
}

export const useResponsivePosition = ({ position }: TResponsivePositionProps) => {
  const { size } = useThree()

  return {
    position: [
      (position[0] / referenceWidth) * size.width,
      (position[1] / referenceHeight) * size.height,
      position[2]
    ] as [number, number, number]
  }
}
