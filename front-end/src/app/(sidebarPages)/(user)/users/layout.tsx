import PageTitle from '@/components/PageTitle'

import type { PropsWithChildren } from 'react'

type LayoutProps = object

function layout({ children }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      <div className="mb-4">
      </div>
      {children}
    </>
  )
}

export default layout
