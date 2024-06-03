import React from 'react'

import type { PropsWithChildren } from 'react'

export function Button(
  props: PropsWithChildren<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >
  >
) {
  return (
    <button
      {...props}
      className={`flex items-center rounded-md px-3 py-1 font-quicksand text-sm font-semibold text-white ${props.className}`}
    >
      {props.children}
    </button>
  )
}
