import { Dialog, Transition } from '@headlessui/react'
import { SquaresPlusIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'

import type { ModalProps } from '.'

export default function Modal({
  children,
  method = 'GET',
  title,
  onSubmit,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <form className="h-full">
      <button
        type="button"
        onClick={openModal}
        className="flex h-full items-center rounded-md bg-blue-500 px-3 py-1 font-quicksand text-sm font-semibold text-white"
      >
        <SquaresPlusIcon className="mr-2 size-5" strokeWidth={2} />
        Add
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className=" flex max-h-full min-h-full flex-col items-center justify-center p-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  as="form"
                  method={method}
                  onSubmit={onSubmit}
                   className="my-8 flex min-h-full w-full max-w-2xl  grow flex-col rounded-2xl bg-white py-6 text-left align-middle shadow-xl transition-all"
                >
                  <Dialog.Title
                    as="h3"
                    className="mb-4 px-6 font-poppins text-xl font-bold leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>

                  <div className="scroll m-3  min-h-60 grow overflow-y-auto px-4">
                    {children}
                  </div>
                  <div className="flex items-center justify-end gap-x-6 border-t px-6 pt-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </form>
  )
}
