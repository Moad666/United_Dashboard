import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

import type { PropsWithChildren } from 'react'

type AccordionProps = { name: string; count: number; panelClassName?: string }

// creates an accordion UI element using Headless UI's Disclosure.
function Accordion({
  name,
  children,
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
          <h3 className="mb-2 flow-root font-inter">
            <Disclosure.Button className="flex w-full items-center justify-between border-b py-2 text-sm text-gray-400 hover:text-gray-500">
              <span className="relative font-semibold text-gray-900">
                {name}
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
          <Disclosure.Panel className="scroll relative mt-3  grow overflow-auto rounded-md border transition-all duration-300">
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Accordion // The component is exported for use in other parts of the application.
