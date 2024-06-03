import { isImgUrl } from '../../utils/isImgUrl'

import { Dialog, Transition } from '@headlessui/react'
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { Fragment, useState } from 'react'

// show a popup that's contains an image when click on a specific button
export default function ImagePopup({ imgSrc }) {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="absolute right-4 top-4 z-50 overflow-hidden rounded-lg border bg-white p-2 shadow-md transition-all duration-300 ease-in  hover:bg-gray-200"
      >
        <ArrowsPointingOutIcon className="size-6 text-black " />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 overflow-hidden"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="flex min-h-full min-w-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative  size-full overflow-hidden  rounded-lg bg-transparent p-10 text-left  align-middle transition-all">
                  <div className="scroll relative flex h-[800px] w-full items-center justify-center">
                    <button
                      type="button"
                      className="absolute right-6 top-4 z-50 rounded-lg border bg-white p-2 shadow-md hover:bg-slate-300"
                      onClick={closeModal}
                    >
                      <ArrowsPointingInIcon className="size-6 text-black " />
                    </button>

                    {isImgUrl(imgSrc) ? (
                      <Image
                        height={700}
                        width={700}
                        alt={'Image'}
                        src={imgSrc}
                        className="h-[800] min-h-[700px] w-full rounded-lg"
                      />
                    ) : (
                      <iframe

                        // sandbox="allow-scripts"
                        height="80%"
                        width="80%"
                        allowFullScreen
                        className="flex items-center bg-cover"
                        src={imgSrc}
                      ></iframe>
                    )}
                  </div>
                  {/* */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
