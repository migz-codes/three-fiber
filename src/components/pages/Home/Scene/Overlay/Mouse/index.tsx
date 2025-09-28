import { useAtomValue } from 'jotai'
import { globalStore } from '@/store'
import { Content } from './Content'

export const Mouse = () => {
  const mouseOverlayText = useAtomValue(globalStore.mouseOverlayText)

  return mouseOverlayText ? <Content /> : <></>
}
