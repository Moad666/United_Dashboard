import { classNames } from '@/utils/classNames'

import type { PropsWithChildren } from 'react'

export type CardsFlexProps = PropsWithChildren<{ className?: string }>
export const CardsFlex = ({
  children,
  className = 'grid-cols-3',
}: PropsWithChildren<CardsFlexProps>) => {
  const style = classNames(
    className,
    ' absolute inset-0  size-full shrink items-start justify-center  gap-6  px-6 py-2'
  )
  return (
    <div className="scroll relative flex grow scroll-p-8 flex-col overflow-auto ">
      <div className={style}>{children}</div>
    </div>
  )
}
