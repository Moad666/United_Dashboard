'use client'
import { ListItems } from '@/components/Bars/Sidebar/Sidebar'

import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/outline'

import type { ListItemsType } from '@/components/Bars/Sidebar/Sidebar'

type Props = object

const settingItems: ListItemsType = [
  { id: '1', name: 'Profile', href: '/settings', Icon: UserCircleIcon },
  {
    id: '2',
    name: 'Security & Privacy',
    href: '/settings/security',
    Icon: LockClosedIcon,
  },
]

const SettingSidebar = (props: Props) => {
  return <ListItems items={settingItems} title={'Settings'} />
}

export default SettingSidebar
