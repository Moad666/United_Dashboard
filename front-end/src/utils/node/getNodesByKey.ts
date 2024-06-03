import type { FilterKeysEnum } from '.'
import type { NodeProps } from '@/types/external/Node'

export function getNodesByKey(
  items: Array<NodeProps>,
  key: FilterKeysEnum
): string[] {
  const res: string[] = []

  for (const item of items) {
    const value: string | number = item[key]
    if (value && !res.includes(value.toString())) {
      res.push(value.toString())
    }
  }

  // Sort values and remove any repeated value
  return Array.from(new Set(res)).sort((str, str1) => {
    return str.localeCompare(str1)
  })
}
