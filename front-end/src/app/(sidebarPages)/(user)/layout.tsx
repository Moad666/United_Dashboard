import type { PropsWithChildren } from 'react'

type WizardLayoutProps = object

function layout({ children }: PropsWithChildren<WizardLayoutProps>) {
  return <div className=" flex grow flex-col px-6 pt-6">{children}</div>
}

export default layout
