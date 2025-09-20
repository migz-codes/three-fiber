import { useAtom } from 'jotai'
import { globalStore } from '@/store'

export const Menu = () => {
  const [isDev, setIsDev] = useAtom(globalStore.isDev)

  return (
    <>
      <aside className='w-[100px] fixed top-[0px] left-[0px] h-[100px] z-10 bg-transparent'>
        <button
          onClick={() => setIsDev((prev) => !prev)}
          type='button'
          className='bg-primary-500 text-white p-2 text-[24px]'
        >
          {isDev ? 'Set production' : 'Set development'}
        </button>
      </aside>
    </>
  )
}
