export function startIndex(currentPage: number, itemsPerPage: number) {
  return currentPage * itemsPerPage + 1
}

export function endIndex(
  currentPage: number,
  itemsPerPage: number,
  totalItems: number
) {
  return Math.min((currentPage + 1) * itemsPerPage, totalItems)
}

export function totalPages(totalApps: number, appPerPage: number) {
  return Math.ceil(totalApps / appPerPage)
}

export function btnsNumbers(totalPages: number, currentPage: number) {
  const start = 0
  const end = totalPages - 1
  if (totalPages <= 7) {
    return Array(totalPages)
      .fill(0)
      .map((c, idx) => idx)
  } else if (currentPage <= 3) {
    return [start, start + 1, start + 2, start + 3, start + 4, '...', end]
  } else if (currentPage >= end - 2) {
    return [start, '...', end - 4, end - 3, end - 2, end - 1, end]
  } else {
    return [
      start,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      end,
    ]
  }
}
