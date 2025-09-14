import { degToRad } from '@/utils/degToRad'

export interface TWallProps {
  size: number
  height: number
  depth: number
}

const BackWall = ({ size, height, depth }: TWallProps) => (
  <mesh position={[0, height / 2, -size / 2]} receiveShadow>
    <boxGeometry args={[size, height - depth, depth]} />
    <meshPhongMaterial color='#ecceb2' />
  </mesh>
)

const RightWall = ({ size, height, depth }: TWallProps) => (
  <mesh position={[size / 2, height / 2, 0]} rotation={[0, degToRad(90), 0]} receiveShadow>
    <boxGeometry args={[size, height - depth, depth]} />
    <meshPhongMaterial color='#ecceb2' />
  </mesh>
)

export const LeftWall = ({ size, height, depth }: TWallProps) => (
  <mesh position={[-size / 2, height / 2, 0]} rotation={[0, degToRad(90), 0]} receiveShadow>
    <boxGeometry args={[size, height - depth, depth]} />
    <meshPhongMaterial color='#ecceb2' />
  </mesh>
)

const Ground = ({ depth, size }: TWallProps) => (
  <mesh position={[0, 0.0, 0]} rotation={[0, degToRad(90), 0]} receiveShadow>
    <boxGeometry args={[size, depth, size + depth]} />
    <meshPhongMaterial color='#d0a5d8' />
  </mesh>
)

export const Ambient = () => {
  const depth = 0.1
  const size = 20
  const height = 10

  return (
    <>
      <BackWall size={size} height={height} depth={depth} />
      <RightWall size={size} height={height} depth={depth} />
      <LeftWall size={size} height={height} depth={depth} />
      <Ground depth={depth} size={size} height={height} />
    </>
  )
}
