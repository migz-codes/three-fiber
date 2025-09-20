import { Html } from '@react-three/drei'

export const Loader = () => {
  return (
    <Html center>
      <div className='flex items-center justify-center w-screen'>
        <span className='text-[24px] text-[#fff] font-primary font-[600]'>{`Loading`}</span>
      </div>
    </Html>
  )
}
