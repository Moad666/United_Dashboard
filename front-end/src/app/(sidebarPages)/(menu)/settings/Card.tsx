import type { PropsWithChildren } from 'react'

type CardProps = {
  title: string
}
export function Card({ title, children }: Readonly<PropsWithChildren<CardProps>>) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border p-4">
      <div className="border-b pb-4">
        <h1 className="text-base font-semibold">{title}</h1>
      </div>
      <div className="flex flex-col gap-3 divide-y  first:pt-0">
        {children}
      </div>
    </div>
  )
}

type CardSectionProps = {
  title: string
  description: string
}
export function CardSection({
  title,
  description,
  children,
}: Readonly<PropsWithChildren<CardSectionProps>>) {
  return (
    <div className="flex flex-row gap-3 pt-3 first:pt-0">
      <div className="flex grow flex-col gap-2">
        <h1 className="h-[22px] text-sm font-medium capitalize">{title}</h1>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="flex items-center justify-center">{children}</div>
    </div>
  )
}
