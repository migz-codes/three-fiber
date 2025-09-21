import { PointsLight } from './PointLights'
import { Spotlight } from './Spotlight'

export const Lights = () => (
  <>
    <Spotlight />
    {/* <ambientLight intensity={0.5} /> */}
    <PointsLight />
  </>
)
