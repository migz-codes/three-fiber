import { FullScreenLoader } from './FullScreenLoader'
import { Mouse } from './Mouse'
import { Settings } from './Settings'

export const Overlay = () => (
  <div
    id='overlay'
    className='fixed top-[0px] right-[0px] z-10 bottom-[0px] left-[0px]  pointer-events-none'
  >
    <Settings />
    <Mouse />
    <FullScreenLoader />
  </div>
)
