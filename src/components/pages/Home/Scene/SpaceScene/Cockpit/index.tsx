import { useGLTF } from '@react-three/drei'
import { degToRad } from '@/utils/degToRad'

export const Cockpit = () => {
  const { scene } = useGLTF('/models/cockpit.glb')

  return <primitive object={scene} scale={2} rotation={[0, degToRad(-40), degToRad(-20)]} />
}
