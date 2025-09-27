import { GizmoHelper, GizmoViewcube, GizmoViewport } from '@react-three/drei'
import { useAtomValue } from 'jotai'
import { globalStore } from '@/store'

export const Helpers = () => {
  const isDev = useAtomValue(globalStore.isDev)
  const isGizmaViewCube = useAtomValue(globalStore.isGizmaViewCube)

  if (isDev)
    return (
      <>
        {/* <gridHelper args={[50, 50, '#f00', '#fff']} /> */}

        <GizmoHelper alignment='bottom-right' margin={[80, 80]} scale={100}>
          {isGizmaViewCube ? <GizmoViewcube /> : <GizmoViewport />}
        </GizmoHelper>
      </>
    )
}
