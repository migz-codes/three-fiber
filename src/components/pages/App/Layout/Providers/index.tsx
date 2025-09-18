'use client'

import { Provider } from 'jotai'
import type { TChildrenProps } from '@/types'

export const Providers = ({ children }: TChildrenProps) => <Provider>{children}</Provider>
