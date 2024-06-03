import type { MouseEventHandler, PropsWithChildren } from 'react'

type PagebtnProps = {
  handleClick: MouseEventHandler<HTMLButtonElement>
  isCurrent?: boolean
  disabled?: boolean
}

export function PageBtn({
  children,
  handleClick,
  isCurrent = false,
  disabled = false,
}: PropsWithChildren<PagebtnProps>) {
  return (
    <button
      onClick={handleClick}
      className={`relative inline-flex size-10 items-center  justify-center rounded-md text-sm font-semibold ring-1 ring-inset ${
        isCurrent ? 'bg-blue-500 text-white ring-blue-500' : 'text-gray-500 ring-gray-300  hover:font-black hover:text-gray-700 hover:ring-blue-500'
      }   transition-all duration-300 ease-in focus:z-20 focus:outline-offset-0 disabled:bg-gray-100 disabled:ring-0`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
