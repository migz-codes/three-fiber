import * as THREE from 'three'

export const createCurve = (
  initialPosition: [number, number, number],
  finalPosition: [number, number, number],
  lift: number,
  axis: 'x' | 'y' | 'z' = 'y'
) => {
  const finalPoint = new THREE.Vector3(...finalPosition)
  const initialPoint = new THREE.Vector3(...initialPosition)

  const xMidPoint = (initialPosition[0] + finalPosition[0]) / 2
  const yMidPoint = (initialPosition[1] + finalPosition[1]) / 2
  const zMidPoint = (initialPosition[2] + finalPosition[2]) / 2

  const controlPoint = (() => {
    switch (axis) {
      case 'x':
        return new THREE.Vector3(
          Math.max(initialPosition[0], finalPosition[0]) + lift,
          yMidPoint,
          zMidPoint
        )

      case 'y':
        return new THREE.Vector3(
          xMidPoint,
          Math.max(initialPosition[1], finalPosition[1]) + lift,
          zMidPoint
        )

      case 'z':
        return new THREE.Vector3(
          xMidPoint,
          yMidPoint,
          Math.max(initialPosition[2], finalPosition[2]) + lift
        )
    }
  })()

  return new THREE.QuadraticBezierCurve3(initialPoint, controlPoint, finalPoint)
}
