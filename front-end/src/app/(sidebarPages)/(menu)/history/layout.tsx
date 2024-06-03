import type { PropsWithChildren } from 'react'

type WizardLayoutProps = object

function layout({ children }: PropsWithChildren<WizardLayoutProps>) {
  return <>{children}</>
}

export default layout
