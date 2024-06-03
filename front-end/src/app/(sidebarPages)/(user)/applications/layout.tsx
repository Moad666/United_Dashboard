import type { PropsWithChildren } from 'react'

type LayoutProps = object

function layout({ children }: PropsWithChildren<LayoutProps>) {
  return <>{children}</>
}

export default layout
