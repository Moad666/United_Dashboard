import type { FilterKeysEnum, GroupKeysEnum } from '.'
import type { NodeProps } from '@/types/external/Node'

export function getAppsByKey(
  apps: Array<NodeProps>,
  key: FilterKeysEnum | GroupKeysEnum
) {
  const res: string[] = []

  for (const app of apps) {
    const value = app[key]
    if (value && !res.includes(value as string)) {
      res.push(value.toString())
    }
  }

  // sort keys and remove any repeated key

  return Array.from(new Set(res)).toSorted((str, str1) => {
    return str.localeCompare(str1)
  })
}
