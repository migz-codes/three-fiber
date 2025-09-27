import { CameraControls, PerspectiveCamera } from '@react-three/drei'

import { Galaxy } from './Galaxy'
import { Lights } from './Lights'
import { Spaceship } from './Spaceship'

export const SpaceScene = () => (
  <>
    <Galaxy />

    <Spaceship />

    <PerspectiveCamera makeDefault position={[400, 350, -30]}>
      <Lights />
    </PerspectiveCamera>

    <CameraControls enabled={false} />
  </>
)
