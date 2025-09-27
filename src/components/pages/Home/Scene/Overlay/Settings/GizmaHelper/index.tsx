import { useAtom, useAtomValue } from 'jotai'
import { globalStore } from '@/store'
import { Item } from '../Item'

export const GizmaHelper = () => {
  const isDev = useAtomValue(globalStore.isDev)
  const [isGizmaViewCube, setIsGizmaViewCube] = useAtom(globalStore.isGizmaViewCube)

  const onGizmaViewCubeClick = () => {
    setIsGizmaViewCube(!isGizmaViewCube)
  }

  if (!isDev) return <></>

  return (
    <Item onClick={onGizmaViewCubeClick}>
      {isGizmaViewCube ? 'mudar para viewport' : 'mudar para view cube'}
    </Item>
  )
}
