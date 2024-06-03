import type { HeroiconType } from '@/types/Icon/SVGProps'
import type { HTMLAttributes } from 'react'

import type { ExtractKeysOfType } from '@/types/ExtractKeys'

export type ItemProps<T> = {
  name: ExtractKeysOfType<T, string>
  id: string
  Icon?: HeroiconType
}

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & { name: string }

export type GroupDropdownProps = {
  items: ItemProps[]
  button: ButtonProps
  selected: string | null
  handleSelectedGroup: (group: string) => void
}

// export type DropdownProps = {
//   items: ItemProps[]
//   button: ButtonProps
//   selected: string | null
//   handleSelectedGroup: (group: string) => void
// }
