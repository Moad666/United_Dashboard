import styles from './input.module.css'

import type { ChangeEventHandler } from 'react'

type LabeledInputProps = {
  label: string
  id: string
  name: string
  placeholder?: string
  required?: boolean
  autoComplete?: string
  onInputChange?: ChangeEventHandler<HTMLInputElement> | null
  value: string
}

export const LabeledInput = ({
  label,
  id,
  name,
  placeholder,
  autoComplete = 'given-name',
  required = false,
  onInputChange = null,
  value,
}: LabeledInputProps) => {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={name}
          id={id}
          autoComplete={autoComplete}
          className={styles.form_input}
          placeholder={placeholder}
          onChange={onInputChange}
          value={value}
        />
      </div>
    </>
  )
}
