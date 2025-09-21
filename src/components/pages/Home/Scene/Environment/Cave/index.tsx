import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useEffect } from 'react'
import * as THREE from 'three'
import { useARMTexturesWithDisplacement } from '@/hooks/useTextures'
import { degToRad } from '@/utils/degToRad'

export const Cave = () => {
  const { scene } = useGLTF('/models/cave_rocks.glb')
  const { textures, makeRepeatable, applyUV2 } = useARMTexturesWithDisplacement({ name: 'rock' })

  makeRepeatable(4, 4)

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh

        mesh.material = new THREE.MeshStandardMaterial({
          ...textures
        })

        mesh.castShadow = true
        mesh.receiveShadow = true
        applyUV2(mesh.geometry)

        const material = mesh.material as THREE.MeshStandardMaterial

        // material.wireframe = true
        material.displacementScale = 1
        material.displacementMap = textures.displacementMap
      }
    })
  }, [scene, textures, applyUV2])

  return (
    <>
      <RigidBody type='fixed' name='cave' colliders='trimesh'>
        <primitive
          castShadow
          scale={0.01}
          object={scene}
          position={[-20, 0, -20]}
          rotation={[0, degToRad(-90), 0]}
        />
      </RigidBody>
    </>
  )
}
