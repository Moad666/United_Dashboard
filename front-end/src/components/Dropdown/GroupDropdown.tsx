'use client'

import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React, { Fragment } from 'react'

import type { GroupDropdownProps } from '.'

export default function GroupDropdown({
  items,
  button,
  selected,
  handleSelectedGroup,
}: Readonly<GroupDropdownProps>) {
  const handleGroupSelection = (name: string | null) => {
    handleSelectedGroup(name)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={button.className}>
          {button.name} <ChevronDownIcon className="ml-2 size-4" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white p-2 shadow-lg ring-1 ring-black/5 focus:outline-none">
          {selected && (
            <SelectedGroupButton
              selected={selected}
              handleGroupSelection={handleGroupSelection}
            />
          )}
          <div className="py-1">
            {items.map(({ id, name }) => (
              <MenuItem
                key={id}
                name={name}
                handleGroupSelection={handleGroupSelection}
              />
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

interface MenuItemProps {
  name: string;
  handleGroupSelection: (name: string | null) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, handleGroupSelection }) => (
  <Menu.Item>
    <button
      className="group flex w-full items-center rounded-md px-4 py-2 font-poppins text-base text-black hover:bg-blue-500 hover:text-white"
      onClick={() => handleGroupSelection(name)}
    >
      {name}
    </button>
  </Menu.Item>
)

interface SelectedGroupButtonProps {
  selected: string;
  handleGroupSelection: (name: string | null) => void;
}

const SelectedGroupButton: React.FC<SelectedGroupButtonProps> = ({ selected, handleGroupSelection }) => (
  <div className="inline-flex w-full items-center py-1 font-poppins text-base text-gray-500">
    <button
      type="button"
      className="mr-2 rounded-md border p-1"
      onClick={() => handleGroupSelection(null)}
    >
      <XMarkIcon className="size-4" />
    </button>
    <span className="px-2 text-gray-400">{selected}</span>
  </div>
)
