export function splitStr(str: string) {
  const arr = str?.split(',').flat() ?? []
  return UniqueStrs(arr)
}
export function UniqueStrs(arr: string[]) {
  return Array.from(new Set(arr))
}
