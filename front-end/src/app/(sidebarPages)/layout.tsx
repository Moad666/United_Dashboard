import NavBar from '@/components/Bars/Navbar/Navbar'
import Sidebar from '@/components/Bars/Sidebar/Sidebar'
import { auth } from 'auth'

import { redirect } from 'next/navigation'

import type { PropsWithChildren } from 'react'

import type { SessionUserProps } from '@/types/SessionUserProps'

type WizardLayoutProps = object

async function layout({ children }: PropsWithChildren<WizardLayoutProps>) {
  const session = await auth()
  const userData: SessionUserProps = session?.user

  // if (!session) {
  //   console.log('Not authorized')
  //   return redirect('/login')
  // }

  return (
    <div className="flex h-full flex-row">
      <Sidebar data={userData} />
      <main className="flex size-full flex-col pl-[230px] pt-[86px]">
        <NavBar data={userData} />
        <div className="relative flex size-full flex-col overflow-hidden">{children}</div>
      </main>
    </div>
  )
}
export default layout
