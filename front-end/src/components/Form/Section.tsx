import type { PropsWithChildren } from 'react'

type InputSectionProps = {
  title: string
  description: string
}

export function Section({
  title,
  description,
  children,
}: PropsWithChildren<InputSectionProps>) {
  return (
    <div className="border-b border-gray-900/10 pb-12 ">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        {title}
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>
      {children}
    </div>
  )
}
