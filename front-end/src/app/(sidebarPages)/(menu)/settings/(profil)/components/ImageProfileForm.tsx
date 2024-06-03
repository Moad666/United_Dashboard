'use client'

import { DocumentArrowUpIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export function ImageProfileForm() {
  const currentUser = useSession()

  return (
    <div className="flex w-full flex-col gap-7 rounded-md border p-4">
      <div className="border-b">
        <h1 className="pb-4 text-center text-base font-semibold">
          Profile Picture
        </h1>
      </div>
      <div className="flex items-center justify-center">
        <Image
          src={currentUser.data?.user.image}
          height={72}
          width={72}
          alt="image-profile"
          className="rounded-full border border-blue-500"
        />
      </div>
      <div className="flex w-full border-spacing-4 flex-col items-center gap-4 rounded-lg border-2 border-dashed bg-gray-50 p-5">
        <span>
          <DocumentArrowUpIcon className="size-8 text-blue-500" />
        </span>
        <h1>Drag a photo here</h1>
        <p className="text-xs text-slate-300">OR</p>
        <button
          type="button"
          className="w-full rounded-md bg-blue-500 p-3 text-sm text-white"
        >
          Upload Photo
        </button>
      </div>
    </div>
  )
}
