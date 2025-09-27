import type { ThreeElements } from '@react-three/fiber'

export interface TChildrenProps {
  children: React.ReactNode
}

export interface TClassNameProps {
  className?: string
}

export interface TComponentProps extends TChildrenProps, TClassNameProps {}

export type TPrimitiveProps = Partial<ThreeElements['primitive']>
