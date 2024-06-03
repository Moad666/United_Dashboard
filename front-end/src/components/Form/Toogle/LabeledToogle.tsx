import Toogle from './ToogleInput'

type LabeledToogleProps = {
  id: string
  name: string
  label: string
  description: string
  isOn?: boolean
  onChange?: (value: boolean) => void
}

export const LabeledToogle = ({
  id,
  name,
  label,
  description,
  isOn = false,
  onChange,
}: LabeledToogleProps) => {
  return (
    <div className="relative flex items-center gap-x-3 py-2">
      <div className="flex h-6 items-center">
        <Toogle enabled={isOn} setEnabled={onChange} name={name} />
      </div>
      <div className="text-sm leading-6">
        <label htmlFor={id} className="font-medium text-gray-900">
          {label}
        </label>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  )
}
