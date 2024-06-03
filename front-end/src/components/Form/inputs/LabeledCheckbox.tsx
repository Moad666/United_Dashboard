import React from 'react'

import type { ChangeEventHandler, MouseEventHandler } from 'react'

type CheckboxProps = {
  handleClick?: MouseEventHandler<HTMLInputElement>
  handleChange?: ChangeEventHandler<HTMLInputElement>
  id: string
  name: string
  label?: string
  checked?: boolean
}

function Checkbox({
  handleClick = () => {},
  handleChange = () => {},
  id,
  name,
  label = name,
  checked = false,
}: Readonly<CheckboxProps>) {
  return (
    <div className="flex items-center break-words">
      <input
        onChange={handleChange}
        onClick={handleClick}
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={id} className="ml-3 text-sm text-gray-600">
        {label}
      </label>
    </div>
  )
}

export default Checkbox
