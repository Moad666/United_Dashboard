import Breamdcumb from '@/components/Bars/Navbar/Breamdcumb'

import type { SessionUserProps } from '@/types/SessionUserProps'

function NavBar({ data }: Readonly<{ data: SessionUserProps }>) {
  return (
    <header className="fixed inset-0 left-[230px] h-[86px] w-full px-4">
      <div className="h-full border-b p-4">
        <p className="font-poppins font-bold">
          Welcome Back,{' '}
          <span className=" capitalize text-blue-500">{data.name}!</span>
        </p>
        <Breamdcumb />
      </div>
    </header>
  )
}

export default NavBar
