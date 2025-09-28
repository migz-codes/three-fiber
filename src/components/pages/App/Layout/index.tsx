import '@/styles/globals.css'
import { Roboto, VT323 } from 'next/font/google'
import type { TChildrenProps } from '@/types'
import { Providers } from './Providers'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], variable: '--roboto-font' })
const vt323 = VT323({ weight: ['400'], subsets: ['latin'], variable: '--vt323-font' })

export const AppLayout = ({ children }: TChildrenProps) => (
  <html lang='en'>
    <body className={`${roboto.variable} ${vt323.variable}  bg-[#0f0f0f]`}>
      <Providers>{children}</Providers>
    </body>
  </html>
)
