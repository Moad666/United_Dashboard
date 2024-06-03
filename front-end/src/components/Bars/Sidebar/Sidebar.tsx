'use client'
import NodesIcon from './NodesIcon'
import SidebarAvater from './SidebarAvater'
import styles from './sidebar.module.css'

import SidebarMenuItem from '@/components/Bars/Sidebar/SidebarMenuItem'
import UnitedLogo from '@/components/Icons/UnitedLogo'

import {
  ArrowsRightLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  Cog6ToothIcon,
  HomeIcon,
  Squares2X2Icon,
  UsersIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type SVGElementProps from '@/types/Icon/SVGProps'
import type { HeroiconType } from '@/types/Icon/SVGProps'
import type { FunctionComponent } from 'react'

import type { SessionUserProps } from '@/types/SessionUserProps'

export type ListItemProps = {
  name: string
  href: string
  id: string
  Icon?: HeroiconType | FunctionComponent<SVGElementProps>
  children?: Array<ListItemProps> | null
}

export type ListItemsType = Array<ListItemProps>

const menuItems: ListItemsType = [
  { id: '1', name: 'Dashboard', href: '/', Icon: HomeIcon },
  {
    id: '2',
    name: 'Applications',
    href: '/applications',
    Icon: Squares2X2Icon,
  },
  {
    id: '3',
    name: 'Queue Manager',
    href: '/queue_manager',
    Icon: ArrowsRightLeftIcon,
  },
  { id: '4', name: 'Nodes', href: '/nodes', Icon: NodesIcon },
  { id: '5', name: 'Users', href: '/users', Icon: UsersIcon },
]
const userItems: ListItemsType = [
  { id: '1', name: 'History', href: '/history', Icon: ClockIcon },
  { id: '2', name: 'Settings', href: '/settings', Icon: Cog6ToothIcon },
]

function Sidebar({ data }: Readonly<{ data: SessionUserProps }>) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_logo_contanier}>
        <div className="w-full">
          <UnitedLogo className="h-7" />
        </div>
        <button className="rounded-full bg-slate-200 p-1">
          <ChevronRightIcon className="size-4 text-gray-900" strokeWidth={2} />
        </button>
      </div>
      <nav className="flex grow flex-col">
        <div className={styles.sidebar_menu}>
          <ListItems items={menuItems} title={'menu'} />
        </div>
        <div className={styles.sidebar_user}>
          <ListItems items={userItems} title={'user'} />
        </div>
      </nav>
      <div className={styles.avater_container}>
        <SidebarAvater data={data} />
      </div>
    </div>
  )
}

/**
 * Show items in the sidebar
 *
 * @returns
 */
export function ListItems({
  items,
  title,
}: Readonly<{ items: ListItemsType; title?: string }>) {
  const pathname = usePathname()

  return (
    <>
      {title && <div className={styles.list_title}>{title}</div>}
      <ul className={styles.list_container}>
        {items.map(({ id, name, href = null, Icon, children = null }) => {
          const isActive = pathname === href

          if (!children) {
            return (
              <ListItem
                key={id}
                isActive={isActive}
                name={name}
                href={href}
                Icon={Icon}
              />
            )
          } else {
            return (
              <SidebarMenuItem key={id} value={name} Icon={Icon}>
                {children.map(({ id, name, href, Icon }) => {
                  return (
                    <ListItem
                      key={id}
                      isActive={isActive}
                      name={name}
                      href={href}
                      Icon={Icon}
                    />
                  )
                })}
              </SidebarMenuItem>
            )
          }
        })}
      </ul>
    </>
  )
}

function ListItem({ isActive, href, Icon = null, name }) {
  return (
    <li className={!isActive ? styles.list_item : styles.list_item_active}>
      <Link
        href={href}
        className="inline-flex size-full cursor-pointer text-sm font-normal"
      >
        <span>{Icon && <Icon className={styles.list_item_icon} />}</span>
        <span className={styles.list_item_name}>{name}</span>
      </Link>
    </li>
  )
}
export default Sidebar
