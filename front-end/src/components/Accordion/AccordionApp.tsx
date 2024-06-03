import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

import type { PropsWithChildren } from 'react'

type AccordionProps = {
  name: string
  group: string
  count: number
  panelClassName?: string
}

// creates an accordion UI element using Headless UI's Disclosure.
function AccordionApp({
  name,
  children,
  group,
  count,
}: PropsWithChildren<AccordionProps>) {
  return (
    <Disclosure
      as="div"
      defaultOpen={true}
      className="flex w-full flex-col py-2"
    >
      {({ open }) => (
        <>
          <h3 className=" flow-root font-inter">
            <Disclosure.Button className="flex w-full justify-between rounded-lg border bg-white px-4 py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="relative  inline-flex items-start font-semibold text-gray-900">
                <span className="mb-1 flex flex-col justify-start">
                  <span className="text-left text-xs font-normal text-gray-400">
                    {group}
                  </span>
                  <span className="text-left font-manrope text-base font-semibold">
                    {name}
                  </span>
                </span>

                {+count > 0 && <Badge value={count} />}
              </span>
              <span className="ml-6 flex items-center rounded-lg border p-0.5 transition-all duration-300">
                {open ? (
                  <MinusIcon className="size-4" aria-hidden="true" />
                ) : (
                  <PlusIcon className="size-4" aria-hidden="true" />
                )}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="scroll relative -mt-1 flex min-h-[334px]  shrink flex-col overflow-auto rounded-ee-lg rounded-es-lg  border bg-gray-50 p-2 transition-all duration-300">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export function Badge({ value }) {
  return (
    <span className="left-full top-0 ml-2 flex h-4 items-center justify-center rounded-full bg-blue-500  px-1 text-center text-[9px]  text-white">
      {value}
    </span>
  )
}
export default AccordionApp // The component is exported for use in other parts of the application.
