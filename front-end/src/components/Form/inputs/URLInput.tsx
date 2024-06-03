import styles from './input.module.css'

import { LinkIcon } from '@heroicons/react/24/outline'

import type { ChangeEventHandler } from 'react'

export type UrlInputProps = {
  id: string
  name: string
  title: string
  description?: string
  urlPlaceholder?: string
  inputPlaceholder?: string
  onUrlChange?: ChangeEventHandler<HTMLInputElement>
  onTextChange?: ChangeEventHandler<HTMLInputElement>
  required?: boolean
}

const UrlInput = ({
  title,
  description = null,
  name,
  id,
  urlPlaceholder = 'Enter a URL',
  inputPlaceholder = 'Alternative Text',
  onUrlChange,
  onTextChange,
  required = false,
}: UrlInputProps) => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
      <div className="col-span-full">
        <label
          htmlFor="urlInput"
          className="inline-flex flex-row items-center text-sm font-medium leading-6 text-gray-900"
        >
          <LinkIcon className="mr-1 size-4 text-gray-500" /> {title}
        </label>
        <div className="mt-2">
          <input
            type="url"
            id={id}
            name={name}
            autoComplete="url"
            className={styles.form_input}
            placeholder={urlPlaceholder}
            onChange={onUrlChange}
            required={required}
          />
        </div>
        <div className="mt-2">
          <input
            type="text"
            id={'alt-' + id}
            name={'alt' + name}
            autoComplete="off"
            className={styles.form_input}
            placeholder={inputPlaceholder}
            onChange={onTextChange}
          />
        </div>
        {description && (
          <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>
        )}
      </div>
    </div>
  )
}

export default UrlInput
