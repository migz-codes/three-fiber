import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import type { TChildrenProps } from '@/types'

const roboto = Roboto({ subsets: ['latin'], variable: '--roboto-font' })

export const AppLayout = ({ children }: TChildrenProps) => (
  <html lang='en'>
    <body className={`${roboto.variable} bg-[#0f0f0f]`}>{children}</body>
  </html>
)
