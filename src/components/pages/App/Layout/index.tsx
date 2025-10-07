import '@/styles/globals.css'
import { Roboto } from 'next/font/google'
import localFont from 'next/font/local'
import type { TChildrenProps } from '@/types'
import { Providers } from './Providers'

const astro = localFont({ variable: '--astro-font', src: '../../../../../public/fonts/astro.ttf' })
const tesla = localFont({ variable: '--tesla-font', src: '../../../../../public/fonts/tesla.ttf' })
const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'], variable: '--roboto-font' })

export const AppLayout = ({ children }: TChildrenProps) => (
  <html lang='en'>
    <body className={`${astro.variable} ${tesla.variable} ${roboto}  bg-[#0f0f0f]`}>
      <Providers>{children}</Providers>
    </body>
  </html>
)
