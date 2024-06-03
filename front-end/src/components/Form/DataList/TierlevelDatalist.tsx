import TierLevel from '@/components/Tags/TierLevel'

import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

import type { TierLevelEnum } from '@/types/external/Application'

type DataListProps = {
  handleOptionChange: (value: TierLevelEnum) => void
  selected: TierLevelEnum
}
const tierlevelNames: Array<TierLevelEnum> = [
  '4 - Not Critical',
  '3 - Less Critical',
  '2 - Somewhat Critical',
  '1 - Critical',
]

export default function TierlevelDatalist({
  handleOptionChange,
  selected,
}: Readonly<DataListProps>) {
  return (
    <Listbox value={selected} onChange={handleOptionChange}>
      <div className="relative mt-1">
        <Listbox.Button className="block w-full rounded-md border-0 py-1.5 pl-2 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6">
          <TierLevel value={selected} />
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="size-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute  z-20 mt-2 max-h-80 w-full min-w-32 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {tierlevelNames.map((name) => (
              <Listbox.Option
                key={name}
                className={({ active }) =>
                  `relative cursor-default select-none py-1 pl-10 pr-4 ${
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  }`
                }
                value={name}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate py-1 ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {<TierLevel value={name} />}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="size-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
