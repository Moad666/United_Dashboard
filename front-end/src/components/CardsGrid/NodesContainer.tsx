'use client'

import AddNodeForm from '../AddButtonForms/AddNodeForm'

import AccordionApp from '@/components/Accordion/AccordionApp'
import ToolBar from '@/components/Bars/Toolbar/Toolbar'
import { nodeGroups } from '@/components/Bars/Toolbar/items'
import { Button } from '@/components/Buttons'
import NodeCard from '@/components/Cards/NodeCard/NodeCard'
import { CardsFlex } from '@/components/Grids/CardFlex'
import CardsGrid from '@/components/Grids/CardsGrid'
import { NoCardFound } from '@/components/Grids/NoCardFound'
import { Pagination } from '@/components/Pagination/Pagination'
import { endIndex, startIndex } from '@/components/Pagination/utils/pagination'
import { filterNodes } from '@/utils/node/filterNode'
import { groupNodesByKey } from '@/utils/node/groupNodesByKey'
import { downloadExcel } from 'libs/CreateAppsExcel'

import { ArrowUpTrayIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

import type { NodeProps } from '@/types/external/Node'
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'
import type { GroupedNodes, GroupKeysEnum } from '@/utils/node'
import type { ChangeEventHandler, PropsWithChildren } from 'react'

type NodesContainerProps = { nodes: NodeProps[]; filterItems: CheckboxGroups }

const NodesContainer = ({
  nodes,
  filterItems,
  children,
}: PropsWithChildren<NodesContainerProps>) => {
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [appPerPage, setAppPerPage] = useState<number>(6)
  const [searchInput, setSearchInput] = useState<string>('')
  const [checkboxes, setCheckboxes] = useState(filterItems)
  const [selectedGroup, setSelectedGroup] = useState<GroupKeysEnum | null>(null)

  const [filteredNodes, setFilteredNodes] = useState<NodeProps[]>(nodes ?? [])

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
    setFilteredNodes((prev) => filterNodes(nodes, checkboxes, searchInput))
  }, [nodes, checkboxes, searchInput])

  return (
    <>
      <div className="mb-4">
        <ToolBar
          groupItems={nodeGroups}
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
                downloadExcel(nodes, 'Nodes.xlsx')
              }}
            >
              <ArrowUpTrayIcon
                className="mr-2 size-5 text-white"
                strokeWidth={2.5}
              />
              Export
            </Button>
            <AddNodeForm />
          </div>
        </ToolBar>
      </div>
      <div className="flex min-h-[620px] grow flex-col rounded-md border bg-gray-50 px-4 py-6">
        <ShowApps
          nodes={filteredNodes}
          selectedGroup={selectedGroup}
          currentPage={currentPage}
          appPerPage={appPerPage}
        />
      </div>

      <div className="mb-2 mt-4 flex h-16 flex-row items-center justify-center border-t px-4 py-2 font-manrope text-gray-500">
        {!selectedGroup && (
          <Pagination
            currentPage={currentPage}
            totalItems={filteredNodes.length}
            itemsPerPage={appPerPage}
            handleOptionChange={handleOptionChange}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  )
}

export default NodesContainer

type ShowFilteredNodesProps = {
  nodes: NodeProps[]
  currentPage: number
  appPerPage: number
}

type ShowGroupedNodesProps = {
  nodes: GroupedNodes
  selectedGroup: string
}

export function ShowFilteredApps({
  nodes: apps,
  currentPage,
  appPerPage,
}: ShowFilteredNodesProps) {
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
          <NodeCard
            key={c.Name}
            data={c}
            href={`/nodes/${c.Name}`}
            isActive={isActive}
          />
        )
      })}
    </CardsGrid>
  )
}

function ShowGroupedApps({ nodes, selectedGroup }: ShowGroupedNodesProps) {
  if (Object.keys(nodes).length <= 0) {
    console.log('No Nodes Exist')
    return null
  }

  return Object.entries(nodes).map(([groupName, groupNodes]) => (
    <AccordionApp
      key={groupName}
      group={selectedGroup}
      name={groupName}
      count={groupNodes.length}
    >
      <CardsGrid className="grid-cols-3 py-6">
        {groupNodes.map((c, idx) => {
          // indexes range of the the currentPages
          const isActive = true
          return (
            <NodeCard
              key={c.Name}
              data={c}
              href={`/nodes/${c.Name}`}
              isActive={isActive}
            />
          )
        })}
      </CardsGrid>
    </AccordionApp>
  ))
}

// control which type of filter  one to do
export function ShowApps({ nodes, selectedGroup, currentPage, appPerPage }) {
  const groupedApps = groupNodesByKey(nodes, selectedGroup)

  console.log({ selectedGroup, groupedApps })

  if (
    selectedGroup === null ||
    Object.keys(groupedApps).length === nodes.length
  ) {
    return (
      <ShowFilteredApps
        nodes={nodes}
        currentPage={currentPage}
        appPerPage={appPerPage}
      />
    )
  } else {
    return (
      <CardsFlex className="mb-6">
        <ShowGroupedApps nodes={groupedApps} selectedGroup={selectedGroup} />
      </CardsFlex>
    )
  }
}
