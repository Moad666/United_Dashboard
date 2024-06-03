import * as XLSX from 'xlsx'

export function downloadExcel<T>(data: Array<T>, filename: string) {
  // Create a new workbook
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(data)

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  // Convert the workbook data to a Base64-encoded string
  const base64Data = btoa(XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }))

  // Create a data URL
  const dataUrl = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64Data}`

  // Create a download link
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename

  // Append the link to the document
  document.body.appendChild(link)

  // Trigger the click event on the link
  link.click()

  // Remove the link from the document
  document.body.removeChild(link)
}
