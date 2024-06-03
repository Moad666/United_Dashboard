import type { ItemProps } from '@/components/Dropdown'
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'
import type { ChangeEventHandler } from 'react'

export type ToolbarProps = {
  filterItems: CheckboxGroups
  groupItems: ItemProps[]
  selectedGroup: string
  handleCheckboxes: (group: string, checkbox: string) => void
  handleSearchInput: ChangeEventHandler<HTMLInputElement>
  handleSelectedGroup: (group: string) => void
}
