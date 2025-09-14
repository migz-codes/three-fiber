import { useGLTF } from '@react-three/drei'
import { degToRad } from '@/utils/degToRad'

export const Sword = () => {
  const { scene } = useGLTF('/models/sword.glb')

  return (
    <primitive
      scale={10}
      castShadow
      object={scene}
      position={[0, 0.5, -8]}
      rotation={[degToRad(100), 0, 0]}
    />
  )
}
