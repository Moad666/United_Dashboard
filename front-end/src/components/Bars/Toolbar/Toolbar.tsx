import styles from './button.module.css'

import GroupDropdown from '../../Dropdown/GroupDropdown'

import Filterbar from '@/components/Bars/FilterBar/FilterBar'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import type { ToolbarProps } from '.'
import type { PropsWithChildren } from 'react'

function ToolBar({
  children,
  filterItems,
  groupItems,
  selectedGroup,
  handleCheckboxes,
  handleSearchInput,
  handleSelectedGroup,
}: Readonly<PropsWithChildren<ToolbarProps>>) {
  return (
    <div className="flex flex-row">
      <div className="">
        <Searchbar handleChange={handleSearchInput} />
      </div>
      <div className="ml-auto flex  flex-row  justify-end divide-x-2">
        <div className="flex flex-row  gap-2 px-6">
          <Filterbar
            filterItems={filterItems}
            handleCheckboxes={handleCheckboxes}
          />
          <GroupDropdown
            items={groupItems}
            button={{
              name: 'Group',
              className: styles.btn,
            }}
            handleSelectedGroup={handleSelectedGroup}
            selected={selectedGroup}
          />
        </div>
        {children}
      </div>
    </div>
  )
}

function Searchbar({ handleChange }) {
  return (
    <form action="" className="">
      <div className={styles.input_container}>
        <span className={styles.input_icon}>
          <MagnifyingGlassIcon className="mr-2 size-4" />
        </span>
        <input
          type="text"
          name="search-input"
          id="search-input"
          className={styles.input}
          placeholder="Search For Application..."
          onChange={handleChange}
        />
      </div>
    </form>
  )
}

export default ToolBar
