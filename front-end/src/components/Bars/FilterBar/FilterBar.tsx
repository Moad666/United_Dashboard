'use client'
import styles from './button.module.css'

import Accordion from '@/components/Accordion/Accordion'
import Checkbox from '@/components/Form/inputs/LabeledCheckbox'

import { Transition } from '@headlessui/react'
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'

type FilterbarProps = {
  filterItems: CheckboxGroups
  handleCheckboxes: (group: string, checkbox: string) => void
}

export interface FilterItem {
  [group: string]: {
    [checkbox: string]: boolean
  }
}

export type FilterItems = Array<FilterItem>
export default function Filterbar({
  filterItems,
  handleCheckboxes,
}: Readonly<FilterbarProps>) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div>
      <button type="button" onClick={openModal} className={styles.btn}>
        <FunnelIcon className="mr-2 size-4" /> Filter
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <div className="">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              role="button"
              tabIndex={0}
              className="absolute inset-0 z-10  bg-black/25"
              onClick={closeModal}
            />
          </Transition.Child>
          <div className="absolute end-0 top-0 z-20 h-full w-96 overflow-y-auto bg-white">
            <div className="flex size-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 max-w-0"
                enterTo="opacity-100 max-w-full"
                leave="ease-in duration-200 max-w-full"
                leaveFrom="opacity-100 max-w-full"
                leaveTo="opacity-0  max-w-0"
              >
                <div className="absolute end-0 top-0 z-20 size-full border-r  bg-white p-2 px-4">
                  <div className="scroll relative flex flex-row overflow-hidden overflow-y-auto pt-4 ">
                    <h1 className="inline-flex grow text-left text-lg font-bold capitalize">
                      <FunnelIcon className="mr-2 size-6 text-blue-500" />
                      Filters
                    </h1>
                    <button type="button" onClick={closeModal}>
                      <XMarkIcon className="size-6 text-gray-500" />
                    </button>
                  </div>
                  <form action="" className="mt-4 px-4 py-2">
                    {Object.keys(filterItems).map((group) => {
                      const checkboxes = Object.entries(filterItems[group])
                      return (
                        <Accordion
                          key={group}
                          name={group}
                          count={checkboxes.length}
                        >
                          <ul className="p-2 text-left ">
                            {checkboxes
                              .toSorted((arr, arr1) => {
                                const res = +arr1[1] - +arr[1]
                                if (res === 0) {
                                  return arr[0].localeCompare(arr1[0])
                                } else {
                                  return res
                                }
                              })
                              .map((arr, key) => {
                                const [checkboxName, isChecked] = arr

                                return (
                                  <li key={checkboxName} className="block py-1">
                                    <Checkbox
                                      label={checkboxName}
                                      id={`${group}-${checkboxName}`}
                                      name={`${group}-${checkboxName}`}
                                      checked={isChecked}
                                      handleChange={(e) =>
                                        handleCheckboxes(group, checkboxName)
                                      }
                                    />
                                  </li>
                                )
                              })}
                          </ul>
                        </Accordion>
                      )
                    })}
                  </form>
                </div>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}
