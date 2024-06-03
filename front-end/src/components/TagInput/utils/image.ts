const getInitials = (name: string): string => {
  const names = name.split(' ')
  return names.length > 1 ? names[0][0] + names[names.length - 1][0] : names[0][0]
}

export const getAvatarColor = (name: string): string => {
  const colors = [
    '#ff6961',
    '#77dd77',
    '#aec6cf',
    '#f49ac2',
    '#ffb347',
    '#aad8d3',
    '#c3a7a7',
  ]
  const charCodeSum = name
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const colorIndex = charCodeSum % colors.length
  return colors[colorIndex]
}

export const getAvatarImage = (name: string): string => {
  // get random color for the background
  const bgColor = getAvatarColor(name)
  const initials = getInitials(name)
  const svgString = `<svg xmlns='http://www.w3.org/2000/svg' height='24' width='24'><rect width='100%' height='100%' fill='${bgColor}'/><text x='50%' y='50%' font-size='12' dy='.3em' fill='white' text-anchor='middle' font-family='Arial, sans-serif'>${initials}</text></svg>`
  const base64Image = `data:image/svg+xml;base64,${btoa(svgString)}`
  return base64Image
}
