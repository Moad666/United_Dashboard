import type { TierLevelEnum } from '@/types/external/Application'

const styles: Array<string> = [
  'bg-red-50 text-red-600 border-red-400',
  'bg-orange-50 text-orange-500 border-orange-400',
  'bg-yellow-50 text-yellow-500 border-yellow-400',
  'bg-emerald-50 text-emerald-600 border-emerald-400',
  'bg-blue-50 text-blue-600 border-blue-400',
  'bg-gray-100 text-gray-700 border-gray-400',
]

type TierLevelProps = {
  value: TierLevelEnum
}

type ColorList = Record<TierLevelEnum, number>

const color: ColorList = {
  '1 - Critical': 0,
  '2 - Somewhat Critical': 1,
  '3 - Less Critical': 2,
  '4 - Not Critical': 3,
}

function TierLevel({ value }: Readonly<TierLevelProps>) {
  const name = value

  const idx = color[name] ?? -2

  return (
    <span
      className={`rounded-full border px-3 py-1 font-quicksand  text-xs font-semibold capitalize ${styles.at(idx)} `}
    >
      {value}
    </span>
  )
}

export default TierLevel
