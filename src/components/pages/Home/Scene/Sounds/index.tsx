import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import { Audio, AudioListener, AudioLoader } from 'three'

export const Sounds = () => {
  const { camera } = useThree()

  useEffect(() => {
    const listener = new AudioListener()
    const sound = new Audio(listener)
    const audioLoader = new AudioLoader()

    const onLoad = (buffer: AudioBuffer) => {
      sound.setVolume(0.2)
      sound.setBuffer(buffer)

      window.addEventListener('click', () => sound.play())
    }

    camera.add(listener)
    audioLoader.load('/sounds/environment.wav', onLoad)
  }, [camera])

  return <></>
}
