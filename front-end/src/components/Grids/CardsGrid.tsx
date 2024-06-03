import { classNames } from '@/utils/classNames'

import type { PropsWithChildren } from 'react'

type CardGridProps = { className?: string }

const CardsGrid = ({
  children,
  className = 'grid-cols-3',
}: PropsWithChildren<CardGridProps>) => {
  const style = classNames(
    'grid',
    className,
    'absolute inset-0 size-full shrink items-start justify-center  gap-6  px-6 py-2.5'
  )
  return (
    <div className="scroll relative flex grow scroll-p-8 flex-col overflow-auto">
      <div className={style}>{children}</div>
    </div>
  )
}

export default CardsGrid
