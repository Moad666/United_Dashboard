import UserDropdown from './UserDropdown'

import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

/**
 * Represents a user's avatar in the sidebar, providing a visual identifier,
 * user information, and click functionality for interaction.
 *
 */
function SidebarAvater({ data }) {
  const { name, image } = data

  return (
    <UserDropdown>
      <div className="flex flex-row items-center gap-2.5">
        <div className="size-12">
          <Image
            alt="avater"
            src={image}
            height={48}
            width={48}
            className="size-12 rounded-full border-2 border-blue-500 bg-blue-500 shadow-sm"
          />
        </div>

        <div className="line-clamp-1 flex flex-col items-start text-xs">
          <h1 className=" font-poppins font-bold capitalize text-gray-900">
            {name}
          </h1>
          <Username username={name.replace(' ', '_')} />
        </div>
        <div className="w-fit">
          <ChevronRightIcon className="size-5 text-gray-500" />
        </div>
      </div>
    </UserDropdown>
  )
}

/**
 *  Show Username UI
 *
 */
function Username({ username }: Readonly<{ username: string }>) {
  return (
    <p className="font-inter text-gray-400">
      <span className="font-medium">@</span>
      <span className="font-medium">{username}</span>
    </p>
  )
}

export default SidebarAvater
