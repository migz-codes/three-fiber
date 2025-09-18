import { Ground } from './Ground'

const size = 30
const height = 10
const depth = 0.01

export const Environment = () => {
  return (
    <>
      {/* <Wall size={size} height={height} depth={depth} position={[0, height / 2, -size / 2]} />

      <Wall
        size={size}
        depth={depth}
        height={height}
        rotation={[0, degToRad(90), 0]}
        position={[size / 2, height / 2, 0]}
      />

      <Wall
        size={size}
        depth={depth}
        height={height}
        rotation={[0, degToRad(90), 0]}
        position={[-size / 2, height / 2, 0]}
      />

      <Wall
        size={size}
        depth={depth}
        height={height}
        rotation={[0, 0, 0]}
        position={[0, height / 2, size / 2]}
      /> */}

      <Ground />
    </>
  )
}
