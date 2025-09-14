import { Html, useProgress } from '@react-three/drei'

export const Loader = () => {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className='flex items-center justify-center w-screen'>
        <span className='text-[24px] text-[#fff] font-primary font-[600]'>{`Loading ${Math.round(progress)}%`}</span>
      </div>
    </Html>
  )
}
