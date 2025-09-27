import { useAnimations } from '@react-three/drei'
import type { RefObject } from 'react'

import * as THREE from 'three'

const animationName = 'Chest_0_A|Chest_0_AAction'

export const useChestAnimations = (
  animations: THREE.AnimationClip[],
  chest: RefObject<THREE.Group<THREE.Object3DEventMap> | null>
) => {
  const { actions } = useAnimations(animations, chest)

  const playOpen = () => {
    const action = actions[animationName]

    if (!action) return

    action.reset()
    action.timeScale = 2
    action.clampWhenFinished = true
    action.setLoop(THREE.LoopOnce, 1)

    action.play()

    const halfTime = action.getClip().duration * 0.5

    const check = () => {
      if (action.time < halfTime) return requestAnimationFrame(check)

      action.paused = true
      action.time = halfTime
    }

    requestAnimationFrame(check)
  }

  const playClose = () => {
    const action = actions[animationName]

    if (!action) return

    action.paused = false
    action.enabled = true
    action.timeScale = -2
    action.clampWhenFinished = true
    action.setLoop(THREE.LoopOnce, 1)
    action.time = action.getClip().duration * 0.5

    action.play()
  }

  return { playOpen, playClose }
}
