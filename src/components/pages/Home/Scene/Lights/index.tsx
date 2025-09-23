import { AmbientLights } from './AmbientLights'
import { PointsLight } from './PointLights'
import { Spotlight } from './Spotlight'

export const Lights = () => (
  <>
    <Spotlight />
    <AmbientLights />
    <PointsLight />
  </>
)
