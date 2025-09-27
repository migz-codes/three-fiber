import type { TChildrenProps } from '@/types'

export interface TItemProps extends TChildrenProps {
  onClick: () => void
}

export const Item = ({ onClick, children }: TItemProps) => (
  <li className='flex items-center justify-center relative z-10'>
    <button
      type='button'
      onClick={onClick}
      className='text-[#fff] text-[14px] p-[8px] capitalize font-[600] hover:bg-[#79797971] w-full'
    >
      {children}
    </button>
  </li>
)
