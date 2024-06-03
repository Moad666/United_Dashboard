'use client'

import AddApplicationForm from '../../AddButtonForms/AddAppForm/AddApplicationForm'

import AccordionApp from '@/components/Accordion/AccordionApp'
import ToolBar from '@/components/Bars/Toolbar/Toolbar'
import { appGroups } from '@/components/Bars/Toolbar/items'
import { Button } from '@/components/Buttons'
import AppCard from '@/components/Cards/AppCard/AppCard'
import { CardsFlex } from '@/components/Grids/CardFlex'
import CardsGrid from '@/components/Grids/CardsGrid'
import { NoCardFound } from '@/components/Grids/NoCardFound'
import { Pagination } from '@/components/Pagination/Pagination'
import { endIndex, startIndex } from '@/components/Pagination/utils/pagination'
import { filterApps } from '@/utils/application/filterApps'
import { groupAppsByKey } from '@/utils/application/groupAppsByKey'
import { downloadExcel } from 'libs/CreateAppsExcel'

import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

import type { AppProps } from '@/types/external/Application'
import type { GroupedApps, GroupKeysEnum } from '@/utils/application'
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'
import type { ChangeEventHandler, PropsWithChildren } from 'react'

type AppsContainerProps = { apps: AppProps[]; filterItems: CheckboxGroups }

const AppsContainer = ({
  apps,
  filterItems,
  children,
}: PropsWithChildren<AppsContainerProps>) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [appPerPage, setAppPerPage] = useState<number>(6)

  const [searchInput, setSearchInput] = useState<string>('')

  const [checkboxes, setCheckboxes] = useState(filterItems)
  const [filteredApps, setFilteredApps] = useState<AppProps[]>(apps ?? [])

  const [selectedGroup, setSelectedGroup] = useState<GroupKeysEnum | null>(null)

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
    setFilteredApps((prev) => filterApps(apps, checkboxes, searchInput))
  }, [apps, checkboxes, searchInput])

  return (
    <>
      <div className="mb-4">
        <ToolBar
          groupItems={appGroups}
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
                downloadExcel(apps, 'Applications.xlsx')
              }}
            >
              <ArrowUpTrayIcon
                className="mr-2 size-5 text-white"
                strokeWidth={2.5}
              />
              Export
            </Button>
            <AddApplicationForm />
          </div>
        </ToolBar>
      </div>
      <div className="flex min-h-[620px] grow flex-col rounded-md border bg-gray-50 px-4 py-6">
        <ShowApps
          apps={filteredApps}
          selectedGroup={selectedGroup}
          currentPage={currentPage}
          appPerPage={appPerPage}
        />
      </div>

      <div className="mb-2 mt-4 flex h-16 flex-row items-center justify-center border-t px-4 py-2 font-manrope text-gray-500">
        {!selectedGroup && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredApps.length}
            itemsPerPage={appPerPage}
            handleOptionChange={handleOptionChange}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  )
}

export default AppsContainer

type ShowFilteredAppsProps = {
  apps: AppProps[]
  currentPage: number
  appPerPage: number
}

type ShowGroupedAppsProps = {
  apps: GroupedApps
  selectedGroup: string
}

export function ShowFilteredApps({
  apps,
  currentPage,
  appPerPage,
}: ShowFilteredAppsProps) {
  // indexes range of the the curentPages
  const start = startIndex(currentPage, appPerPage) - 1
  const end = endIndex(currentPage, appPerPage, apps.length) - 1

  // if no application found
  if (!apps || apps.length <= 0) {
    return <NoCardFound />
  }

  // return the UI
  return (
    <CardsGrid>
      {apps.map((c, idx) => {
        // is the application is in the range
        const isActive = start <= idx && end >= idx
        return (
          <AppCard
            key={c['App Ref']}
            data={c}
            href={`/applications/${c['App Key']}`}
            showAppWithTech={undefined}
            isActive={isActive}
          />
        )
      })}
    </CardsGrid>
  )
}

function ShowGroupedApps({ apps, selectedGroup }: ShowGroupedAppsProps) {
  if (Object.keys(apps).length <= 0) {
    console.log('No Apps Exist')
    return null
  }

  return Object.entries(apps).map(([groupName, groupApps]) => (
    <AccordionApp
      key={groupName}
      group={selectedGroup}
      name={groupName}
      count={groupApps.length}
    >
      <CardsGrid className="grid-cols-3 py-6">
        {groupApps.map((c, idx) => {
          // indexes range of the the currentPages
          const isActive = true
          return (
            <AppCard
              key={c['App Ref']}
              data={c}
              href={`/applications/${c['App Key']}`}
              showAppWithTech={undefined}
              isActive={isActive}
            />
          )
        })}
      </CardsGrid>
    </AccordionApp>
  ))
}

// control which type of filter  one to do
export function ShowApps({ apps, selectedGroup, currentPage, appPerPage }) {
  const groupedApps = groupAppsByKey(apps, selectedGroup)

  console.log({ selectedGroup, groupedApps })

  if (
    selectedGroup === null ||
    Object.keys(groupedApps).length === apps.length
  ) {
    return (
      <ShowFilteredApps
        apps={apps}
        currentPage={currentPage}
        appPerPage={appPerPage}
      />
    )
  } else {
    return (
      <CardsFlex className="mb-6">
        <ShowGroupedApps apps={groupedApps} selectedGroup={selectedGroup} />
      </CardsFlex>
    )
  }
}
