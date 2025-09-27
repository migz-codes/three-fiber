import { createPortal } from 'react-dom'
import type { TChildrenProps } from '@/types'

type PortalProps = { containerId?: string } & TChildrenProps

export const Portal = ({ children, containerId = 'overlay' }: PortalProps) => {
  const container = document.getElementById(containerId)

  if (!container) return null

  return createPortal(children, container)
}
