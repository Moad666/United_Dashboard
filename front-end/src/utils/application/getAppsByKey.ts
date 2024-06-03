import { getSMEsFromStr } from '@/utils/application/splitStr'

import type { FilterKeysEnum, GroupKeysEnum } from '.'
import type { AppProps } from '@/types/external/Application'

export function getAppsByKey(
  apps: Array<AppProps>,
  key: FilterKeysEnum | GroupKeysEnum
) {
  const res: string[] = []

  if (key === 'SME') {
    for (const app of apps) {
      const value = app[key]
      res.push(...getSMEsFromStr(value as string))
    }
  } else {
    for (const app of apps) {
      const value = app[key]
      if (value && !res.includes(value)) {
        res.push(value)
      }
    }
  }

  // sort keys and remove any repeated key

  return Array.from(new Set(res)).toSorted((str, str1) => {
    return str.localeCompare(str1)
  })
}
