import type { PropsWithChildren } from 'react'

export function Label({
  title,
  children,
  description,
  required = false,
}: PropsWithChildren<{
  title: string
  required: boolean
  description?: string
}>) {
  return (
    <>
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {title} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">{children}</div>
      <p className="mt-1 pl-1 text-sm leading-6 text-gray-400">{description}</p>
    </>
  )
}
