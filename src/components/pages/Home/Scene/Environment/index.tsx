import { degToRad } from '@/utils/degToRad'
import { Ground } from './Ground'
import { Wall } from './Wall'

export const Environment = () => (
  <>
    <Ground />
    <Wall position={[0, 5, -25]} rotation={[0, 0, 0]} />
    <Wall position={[0, 5, 25]} rotation={[0, 0, 0]} />
    <Wall position={[-25, 5, 0]} rotation={[0, degToRad(90), 0]} />
    <Wall position={[25, 5, 0]} rotation={[0, degToRad(90), 0]} />
  </>
)
