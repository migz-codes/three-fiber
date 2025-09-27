import { OrbitControls } from '@react-three/drei'
import { useAtomValue } from 'jotai'
import { globalStore } from '@/store'
import { Character } from './Character'

export const CharacterWrapper = () => {
  const isDev = useAtomValue(globalStore.isDev)

  if (isDev)
    return (
      <>
        <OrbitControls />
      </>
    )

  return <Character />
}
