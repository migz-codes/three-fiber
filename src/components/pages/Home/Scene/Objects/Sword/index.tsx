import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { degToRad } from '@/utils/degToRad'

export const Sword = () => {
  const { scene } = useGLTF('/models/sword.glb')

  return (
    <RigidBody>
      <primitive
        scale={10}
        castShadows
        object={scene}
        position={[0, 0.5, -8]}
        rotation={[degToRad(100), 0, 0]}
      />
    </RigidBody>
  )
}
