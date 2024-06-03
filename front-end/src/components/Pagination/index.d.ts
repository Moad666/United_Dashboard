import type { PropsWithChildren } from 'react'

export type PaginationButtonsProps = Readonly<{
  currentPage: number
  totalPages: number
  onPageChange: (value: number) => void
}>

export type PaginationInfoProps = Readonly<
  PropsWithChildren<{
    totalItems: number
    itemsPerPage: number
    currentPage: number
    handleOptionChange: (value: number) => void
    children
  }>
>

export type PaginationProps = Readonly<{
  totalItems: number
  itemsPerPage: number
  currentPage: number
  handleOptionChange: (value: number) => void
  onPageChange
}>
