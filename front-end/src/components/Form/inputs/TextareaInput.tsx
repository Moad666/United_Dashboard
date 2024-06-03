import type { ChangeEventHandler } from 'react'

interface TextareaProps {
  id?: string
  label: string
  description?: string
  name?: string
  rows?: number
  className?: string
  placeholder?: string
  onChangeInput?: ChangeEventHandler<HTMLTextAreaElement>
  value: string
}

const TextareaInput = ({
  id,
  name,
  rows,
  label,
  description = null,
  placeholder = 'Write a few sentences here',
  onChangeInput = () => {},
  className,
  value,
  ...rest
}: TextareaProps) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          placeholder={placeholder}
          id={id}
          name={name}
          rows={rows}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 ${className}`}
          onChange={onChangeInput}
          value={value}
          {...rest}
        ></textarea>
      </div>
      {description && (
        <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
      )}
    </>
  )
}

export default TextareaInput
