import type { MouseEventHandler } from 'react'

type FormHeaderProps = {
  title: string
  description: string
  onCancel?: () => void
  onSave?: MouseEventHandler<HTMLButtonElement>
}

export default function FormHeader({
  title,
  description,
  onCancel,
  onSave,
}: Readonly<FormHeaderProps>) {
  return (
    <>
      <div className="grow">
        <h1 className="text-lg font-semibold capitalize">{title}</h1>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex items-center rounded-md border  p-2.5 text-sm text-black"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="flex items-center rounded-md border  bg-black p-2.5 text-sm text-white"
        >
          Save
        </button>
      </div>
    </>
  )
}
