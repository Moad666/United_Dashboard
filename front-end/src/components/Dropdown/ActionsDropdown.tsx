import {
  DeleteActiveIcon,
  DeleteInactiveIcon,
  DuplicateActiveIcon,
  DuplicateInactiveIcon,
  EditActiveIcon,
  EditInactiveIcon,
} from './icons'

import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { Fragment } from 'react'

const editIcons = { inactive: EditInactiveIcon, active: EditActiveIcon }
const duplicateIcons = {
  inactive: DuplicateInactiveIcon,
  active: DuplicateActiveIcon,
}
const deleteIcons = { inactive: DeleteInactiveIcon, active: DeleteActiveIcon }
const menuItems = [
  {
    title: 'Edit',
    icon: editIcons,
    onClick: () => {},
  },
  {
    title: 'Duplicate',
    icon: duplicateIcons,
    onClick: () => {},
  },
  {
    title: 'Delete',
    icon: deleteIcons,
    onClick: () => {},
  },
]

export default function ActionsDropDown({
  handleDelete,
  handleEdit,
  handleDuplicate,
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex size-6 justify-center rounded-md text-sm font-medium text-white transition-all duration-300 ease-in hover:ring hover:ring-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
          <EllipsisVerticalIcon className="size-6 text-slate-400" />
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
        <Menu.Items className="absolute right-0 top-5 p-1 z-20 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-2">
            <MenuItem title={'Edit'} icon={editIcons} onClick={handleEdit} />
            <MenuItem
              title={'Duplicate'}
              icon={duplicateIcons}
              onClick={handleDuplicate}
            />
          </div>
          <div className="py-2">
            <MenuItem
              title={'Delete'}
              icon={deleteIcons}
              onClick={handleDelete}
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

function MenuItem({ title, icon, onClick }) {
  const IconInactive = icon.inactive
  const IconActive = icon.active

  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={`${
            active ? 'bg-blue-500 text-white' : 'text-gray-900'
          } group flex w-full items-center rounded-md p-2 text-sm font-medium`}
          onClick={onClick}
        >
          {active ? (
            <IconActive
              className="mr-2 size-5 text-blue-500"
              aria-hidden="true"
            />
          ) : (
            <IconInactive
              className="mr-2 size-5 text-gray-500"
              aria-hidden="true"
            />
          )}
          {title}
        </button>
      )}
    </Menu.Item>
  )
}
