'use client'

import ActionsDropDown from '../Dropdown/ActionsDropdown'

import { useRouter } from 'next/navigation'

import type { PropsWithChildren } from 'react'

type CardProps = {
  href: string
  isActive?: boolean
}

/**
 *  an individual application card in a grid or list view that display the infomation of it.
 *
 * @param {Object} props - The props passed down to the component.
 * @param {string} props.href - The URL path to navigate to on clicking the card.
 */
function Card({
  children,
  href,
  isActive = true,
}: Readonly<PropsWithChildren<CardProps>>) {
  // Hook to access the next.js router object for navigation.
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL + href}`, {
        method: 'DELETE',
      })

      // ? if the delete function doesn't work
      if (!response.ok) {
      }

      // ? if the delete function runs with success
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const handleEdit = async () => {}

  const handleDuplicate = async () => {}

  return (
    <div
      role="button"
      tabIndex={0}
      className={`group relative flex min-h-[270px] cursor-pointer  rounded-2xl border border-solid border-gray-200 bg-white px-4 py-3 shadow-sm transition-all  duration-500 hover:border-transparent hover:bg-blue-50 hover:ring-2  hover:ring-blue-500 ${
        !isActive && 'hidden'
      } w-full min-w-[450px] cursor-pointer`}
      onClick={() => {
        // router.push(process.env.NEXT_PUBLIC_URL + href)
      }}
      onKeyDown={() => {}}
    >
      <div className="absolute right-3 top-3">
        <ActionsDropDown
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleDuplicate={handleDuplicate}
        />
      </div>
      <div className="mx-2 my-4 flex w-full grow gap-x-6">{children}</div>
    </div>
  )
}

export function InfoContainer({ children }) {
  return <div className="mt-3 inline-flex items-center gap-2 ">{children}</div>
}

export default Card
