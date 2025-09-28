import { Html } from '@react-three/drei'

export const FullScreenHtml = ({ onClick, title }: { onClick: () => void; title: string }) => (
  <Html>
    <div className='bg-[#000]/80 fixed top-0 left-0 right-0 bottom-0 w-screen h-screen z-[9999] flex items-center justify-center border-2 border-green-500/80 pointer-events-auto -translate-x-1/2 -translate-y-1/2'>
      <button
        type='button'
        onClick={onClick}
        className='text-white bg-[#000]/50 py-2 px-4 rounded w-auto inline-block animate-pulse cursor-pointer pointer-events-auto'
      >
        <span className='text-[24px] text-green-500/80 font-secondary'>{title}</span>
      </button>
    </div>
  </Html>
)
