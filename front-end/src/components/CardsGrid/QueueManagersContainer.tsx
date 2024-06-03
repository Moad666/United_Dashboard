'use client'

import AddQueueManagerForm from '../AddButtonForms/AddQueueManagerForm'

import AccordionApp from '@/components/Accordion/AccordionApp'
import ToolBar from '@/components/Bars/Toolbar/Toolbar'
import { queueManagerGroups } from '@/components/Bars/Toolbar/items'
import { Button } from '@/components/Buttons'
import QueueManagerCard from '@/components/Cards/QueueManagerCard/QueueManagerCard'
import { CardsFlex } from '@/components/Grids/CardFlex'
import CardsGrid from '@/components/Grids/CardsGrid'
import { NoCardFound } from '@/components/Grids/NoCardFound'
import { Pagination } from '@/components/Pagination/Pagination'
import { endIndex, startIndex } from '@/components/Pagination/utils/pagination'
import { filterQueueManagers } from '@/utils/queueManager/filterQueueManager'
import { groupQueueManagersByKey } from '@/utils/queueManager/groupQueueManagersByKey'
import { downloadExcel } from 'libs/CreateAppsExcel'

import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

import type { QueueManagerProps } from '@/types/external/QueueManager'
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'
import type { GroupedQueueManagers, GroupKeysEnum } from '@/utils/queueManager'
import type { ChangeEventHandler, PropsWithChildren } from 'react'

type QueueManagersContainerProps = {
  queueManagers: QueueManagerProps[]
  filterItems: CheckboxGroups
}

const QueueMangersContainer = ({
  queueManagers,
  filterItems,
  children,
}: PropsWithChildren<QueueManagersContainerProps>) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [appPerPage, setAppPerPage] = useState<number>(6)
  const [searchInput, setSearchInput] = useState<string>('')
  const [checkboxes, setCheckboxes] = useState(filterItems)
  const [selectedGroup, setSelectedGroup] = useState<GroupKeysEnum | null>(null)

  const [filteredQueueManagers, setFilteredQueueManagers] = useState<
    QueueManagerProps[]
  >(queueManagers ?? [])

  // Handlers functions

  /** handle the pagination **/
  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleOptionChange = (value: number) => {
    setAppPerPage(value)
    setCurrentPage(0)
  }

  /** handle the change of a checkbox **/

  const handleCheckboxChange = (group: string, checkbox: string) => {
    // set the checkboxes that are being checked
    setCheckboxes((prevState) => ({
      ...prevState,
      [group]: {
        ...prevState[group],
        [checkbox]: !prevState[group][checkbox],
      },
    }))

    // reset the pagination to the first page
    setCurrentPage(0)
  }

  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchInput(event.target.value)
  }

  const handleSelectedGroup = (group: GroupKeysEnum) => {
    setSelectedGroup(group)
  }

  // filter the application based on the checkboxes that were being selected and the search input
  useEffect(() => {
    setFilteredQueueManagers((prev) =>
      filterQueueManagers(queueManagers, checkboxes, searchInput)
    )
  }, [queueManagers, checkboxes, searchInput])

  return (
    <>
      <div className="mb-4">
        <ToolBar
          groupItems={queueManagerGroups}
          filterItems={checkboxes}
          selectedGroup={selectedGroup}
          handleCheckboxes={handleCheckboxChange}
          handleSearchInput={handleSearchInput}
          handleSelectedGroup={handleSelectedGroup}
        >
          <div className="flex flex-row  gap-2 px-6">
            <Button
              className="bg-green-600"
              onClick={(e) => {
                downloadExcel(queueManagers, 'Queue_Managers.xlsx')
              }}
            >
              <ArrowUpTrayIcon
                className="mr-2 size-5 text-white"
                strokeWidth={2.5}
              />
              Export
            </Button>
            <AddQueueManagerForm />
          </div>
        </ToolBar>
      </div>
      <div className="flex min-h-[620px] grow flex-col rounded-md border bg-gray-50 px-4 py-6">
        <ShowApps
          items={filteredQueueManagers}
          selectedGroup={selectedGroup}
          currentPage={currentPage}
          appPerPage={appPerPage}
        />
      </div>

      <div className="mb-2 mt-4 flex h-16 flex-row items-center justify-center border-t px-4 py-2 font-manrope text-gray-500">
        {!selectedGroup && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredQueueManagers.length}
            itemsPerPage={appPerPage}
            handleOptionChange={handleOptionChange}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  )
}

export default QueueMangersContainer

type ShowFilteredQueueManagersProps = {
  items: QueueManagerProps[]
  currentPage: number
  appPerPage: number
}

type ShowGroupedQueueManagersProps = {
  items: GroupedQueueManagers
  selectedGroup: string
}

export function ShowFilteredApps({
  items,
  currentPage,
  appPerPage,
}: ShowFilteredQueueManagersProps) {
  // indexes range of the the curentPages
  const start = startIndex(currentPage, appPerPage) - 1
  const end = endIndex(currentPage, appPerPage, items.length) - 1

  // if no application found
  if (!items || items.length <= 0) {
    return <NoCardFound />
  }

  // return the UI
  return (
    <CardsGrid>
      {items.map((c, idx) => {
        // is the application is in the range
        const isActive = start <= idx && end >= idx
        return (
          <QueueManagerCard
            key={c.Name}
            data={c}
            href={`/queue_manager/${c.Name}`}
            isActive={isActive}
          />
        )
      })}
    </CardsGrid>
  )
}

function ShowGroupedApps({
  items,
  selectedGroup,
}: ShowGroupedQueueManagersProps) {
  if (Object.keys(items).length <= 0) {
    console.log('No QueueManager Exist')
    return null
  }

  return Object.entries(items).map(([groupName, groupQueueManagers]) => (
    <AccordionApp
      key={groupName}
      group={selectedGroup}
      name={groupName}
      count={groupQueueManagers.length}
    >
      <CardsGrid className="grid-cols-3 py-6">
        {groupQueueManagers.map((c, idx) => {
          // indexes range of the the currentPages
          const isActive = true
          return (
            <QueueManagerCard
              key={c.Name}
              data={c}
              href={`/queue_manager/${c.Name}`}
              isActive={isActive}
            />
          )
        })}
      </CardsGrid>
    </AccordionApp>
  ))
}

// control which type of filter  one to do
export function ShowApps({ items, selectedGroup, currentPage, appPerPage }) {
  const groupedItems = groupQueueManagersByKey(items, selectedGroup)

  console.log({ selectedGroup, groupedItems })

  if (
    selectedGroup === null ||
    Object.keys(groupedItems).length === items.length
  ) {
    return (
      <ShowFilteredApps
        items={items}
        currentPage={currentPage}
        appPerPage={appPerPage}
      />
    )
  } else {
    return (
      <CardsFlex className="mb-6">
        <ShowGroupedApps items={groupedItems} selectedGroup={selectedGroup} />
      </CardsFlex>
    )
  }
}
