import styles from './sidebar.module.css'

import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

import type { HeroiconType } from '@/types/Icon/SVGProps'
import type SVGElementProps from '@/types/Icon/SVGProps'
import type { FunctionComponent, PropsWithChildren } from 'react'

type AccordionProps = {
  value: string
  Icon: HeroiconType | FunctionComponent<SVGElementProps>
}
export default function SidebarMenuItem({
  children,
  value,
  Icon,
}: PropsWithChildren<AccordionProps>) {
  return (
    <Disclosure as="li" className="w-full">
      {({ open }) => (
        <>
          <Disclosure.Button className={styles.list_item}>
            <span className={styles.list_item_icon}>
              {Icon && <Icon className={styles.list_item_icon} />}
            </span>
            <span className={styles.list_item_name}> {value}</span>
            <ChevronUpIcon
              className={`${open ? 'rotate-180' : ''} size-6 stroke-2 text-gray-500`}
            />
          </Disclosure.Button>
          <Disclosure.Panel as="ul" className="px-3 py-2 text-sm text-gray-500">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
