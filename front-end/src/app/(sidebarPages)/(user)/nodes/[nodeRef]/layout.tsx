import PageTitle from '@/components/PageTitle'

import type { PropsWithChildren } from 'react'

type LayoutProps = object

function layout({ children }: Readonly<PropsWithChildren<LayoutProps>>) {
  return (
    <>
      <div className="flex grow flex-col pb-6">
        <div className="mb-4">
          <PageTitle title="Application Details" />
        </div>
        {children}
      </div>
    </>
  )
}

export default layout
