import { useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'

export const useARMTextures = ({ name }: { name: string }) => {
  const [normal, diffuse, arm] = useTexture([
    `/textures/${name}/nor.png`,
    `/textures/${name}/diff.png`,
    `/textures/${name}/arm.png`
  ])

  const applyUV2 = (geo: THREE.BufferGeometry) =>
    geo.setAttribute('uv2', new THREE.BufferAttribute(geo.attributes.uv.array, 2))

  useEffect(() => {
    diffuse.colorSpace = THREE.SRGBColorSpace
  }, [diffuse])

  return {
    applyUV2,
    textures: {
      aoMap: arm,
      map: diffuse,
      metalness: 1,
      roughness: 1,
      normalMap: normal,
      roughnessMap: arm,
      metalnessMap: arm
    }
  }
}

export const useARMTexturesWithDisplacement = ({ name }: { name: string }) => {
  const [normal, diffuse, arm, displacement] = useTexture([
    `/textures/${name}/nor.png`,
    `/textures/${name}/diff.png`,
    `/textures/${name}/arm.png`,
    `/textures/${name}/disp.png`
  ])

  const applyUV2 = (geo: THREE.BufferGeometry) =>
    geo.setAttribute('uv2', new THREE.BufferAttribute(geo.attributes.uv.array, 2))

  useEffect(() => {
    diffuse.colorSpace = THREE.SRGBColorSpace
  }, [diffuse])

  return {
    applyUV2,
    textures: {
      aoMap: arm,
      map: diffuse,
      metalness: 1,
      roughness: 1,
      normalMap: normal,
      roughnessMap: arm,
      metalnessMap: arm,
      displacementScale: 0.1,

      displacementMap: displacement
    }
  }
}
