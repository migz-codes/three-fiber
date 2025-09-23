import { useAtom } from 'jotai'
import { globalStore } from '@/store'
import { Item } from '../Item'

export const DevMode = () => {
  const [isDev, setIsDev] = useAtom(globalStore.isDev)

  const onDevModeClick = () => {
    setIsDev(!isDev)
  }

  return <Item onClick={onDevModeClick}>{isDev ? 'disable dev mode' : 'enable dev mode'}</Item>
}
