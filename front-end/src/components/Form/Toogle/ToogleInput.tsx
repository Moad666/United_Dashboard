import { Switch } from '@headlessui/react'

type ToogleProps = {
  name: string
  enabled: boolean
  setEnabled: (value: boolean) => void
}

export default function Toogle({
  enabled,
  setEnabled,
}: Readonly<ToogleProps>) {
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? 'bg-blue-500' : 'bg-gray-200'}
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
    >
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block size-5 rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  )
}
