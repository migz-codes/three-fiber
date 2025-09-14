import { GizmoHelper, GizmoViewcube } from '@react-three/drei'

export const Helpers = () => {
  return (
    <>
      {/* <gridHelper args={[10, 10, '#f00', '#fff']} /> */}

      <GizmoHelper alignment='bottom-right' margin={[80, 80]} scale={100}>
        <GizmoViewcube />
        {/* <GizmoViewport /> */}
      </GizmoHelper>
    </>
  )
}
