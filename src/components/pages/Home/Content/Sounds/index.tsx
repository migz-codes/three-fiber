import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Audio, AudioListener, AudioLoader } from 'three'

export const Sounds = () => {
  const { camera } = useThree()

  useEffect(() => {
    const listener = new AudioListener()

    camera.add(listener)

    const sound = new Audio(listener)
    const audioLoader = new AudioLoader()

    audioLoader.load('/sounds/environment.wav', (buffer) => {
      sound.setBuffer(buffer)
      sound.setVolume(0.2)

      window.addEventListener('click', () => {
        sound.play()
      })
    })
  }, [camera])

  return <></>
}
