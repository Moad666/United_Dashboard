import SettingSidebar from './SettingSidebar'

import type { PropsWithChildren } from 'react'

type SettingLayoutProps = object

function layout({ children }: PropsWithChildren<SettingLayoutProps>) {
  return (
    <div className="flex size-full flex-row items-stretch">
      <div className="h-full w-64 border-r px-2 pb-2 pt-6">
        <SettingSidebar />
      </div>
      <div className='flex grow flex-col gap-y-8 py-4'>{children}</div>
    </div>
  )
}

export default layout
