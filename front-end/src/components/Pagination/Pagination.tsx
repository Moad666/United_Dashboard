import { PageBtn } from './PageBtn'
import {
  btnsNumbers,
  endIndex,
  startIndex,
  totalPages,
} from './utils/pagination'

import DataList from '@/components/Form/DataList/DataList'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

import type { PaginationButtonsProps, PaginationInfoProps, PaginationProps } from '.'

function PaginationButtons({
  currentPage = 0,
  onPageChange,
  totalPages,
}: PaginationButtonsProps) {
  const handleNextBtn = () => {
    onPageChange((currentPage + 1) % totalPages)
  }
  const handlePrevBtn = () => {
    onPageChange((currentPage - 1 + totalPages) % totalPages)
  }
  const handleNumBtn = (value) => {
    onPageChange(+value)
  }

  if (totalPages > 1) {
    return (
      <nav
        className="isolate inline-flex gap-2 -space-x-px rounded-md"
        aria-label="Pagination"
      >
        <PageBtn handleClick={handlePrevBtn} disabled={currentPage === 0}>
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="size-6" aria-hidden="true" />
        </PageBtn>
        {btnsNumbers(totalPages, currentPage).map((value, index) => {
          const key = parseInt(value as string)

          if (!isNaN(key)) {
            return (
              <PageBtn
                handleClick={() => handleNumBtn(key)}
                key={value}
                isCurrent={currentPage === key}
              >
                {key + 1}
              </PageBtn>
            )
          } else {
            return (
              <span
                key={value}
                className="relative inline-flex size-10  items-center justify-center rounded-md p-2 text-gray-400"
              >
                {value}
              </span>
            )
          }
        })}
        <PageBtn
          handleClick={handleNextBtn}
          disabled={currentPage === totalPages - 1}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="size-6" aria-hidden="true" />
        </PageBtn>
      </nav>
    )
  } else {
    return null
  }
}

function PaginationInfo({
  totalItems: totalApps,
  itemsPerPage: appPerPage,
  currentPage,
  handleOptionChange,
  children,
}: PaginationInfoProps) {
  // the index of the last application in the current page
  const end = endIndex(currentPage, appPerPage, totalApps)

  // the index of the first application in the current page
  const start = startIndex(currentPage, appPerPage)
  return (
    <>
      <div className="flex w-96 items-center justify-start gap-1 font-medium">
        show
        <DataList
          selected={appPerPage}
          handleOptionChange={handleOptionChange}
        />
        applications per page
      </div>
      <div className="flex grow items-center justify-center ">{children}</div>

      <div className="flex w-96 items-center justify-end gap-1 px-4 text-right font-medium">
        <span className="font-bold text-blue-500">
          {start} - {end}
        </span>
        {' of '}
        <span className="font-bold text-black">{totalApps}</span>
        {' Results'}
      </div>
    </>
  )
}

export function Pagination({
  totalItems,
  itemsPerPage: appPerPage,
  currentPage,
  handleOptionChange,
  onPageChange,
}: PaginationProps) {
  const total = totalPages(totalItems, appPerPage)
  return (
    <PaginationInfo
      totalItems={totalItems}
      itemsPerPage={appPerPage}
      currentPage={currentPage}
      handleOptionChange={handleOptionChange}
    >
      <PaginationButtons
        currentPage={currentPage}
        totalPages={total}
        onPageChange={onPageChange}
      />
    </PaginationInfo>
  )
}
