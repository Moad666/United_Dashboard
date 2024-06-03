export function isImgUrl(url) {
  if (!url) return null
  try {
    const path = new URL(url)

    const str = path.origin + path.pathname

    return /\.(jpeg|jpg|gif|png)$/.test(str)
  } catch (e) {
    console.error(e)
    return null
  }
}
