import { createPortal } from 'react-dom'
import type { TChildrenProps } from '@/types'

type TPortalProps = { containerId?: string } & TChildrenProps

export const Portal = ({ children, containerId = 'overlay' }: TPortalProps) => {
  const container = document.getElementById(containerId)

  if (!container) return null

  return createPortal(children, container)
}
