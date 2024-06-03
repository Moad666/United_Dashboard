'use client'
import { Menu, Transition } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import { Fragment } from 'react'

import type { PropsWithChildren } from 'react'

type UserDropdownProps = Readonly<PropsWithChildren<object>>

/**
 * a dropdown menu providing additional actions and options like sign out.
 *
 */
export default function UserDropdown({ children }: UserDropdownProps) {
  return (
    <Menu as="div" className="inline-block text-left">
      <Menu.Button className={'w-full rounded-lg px-2 py-4 hover:bg-gray-100 '}>
        {children}
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute bottom-1/2 left-full z-20 mt-2 w-56 divide-y divide-gray-100 rounded-md bg-white p-2 shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="">
            <Menu.Item>
                <button
                  onClick={async () => {
                    await signOut()
                  }}
                  className={'group flex w-full items-center rounded-md p-2  text-sm text-black hover:bg-blue-500 hover:text-white'}
                >
                  Sign Out
                </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
