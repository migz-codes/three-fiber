export interface TChildrenProps {
  children: React.ReactNode
}

export interface TClassNameProps {
  className?: string
}

export interface TComponentProps extends TChildrenProps, TClassNameProps {}
