import { getAppsByKey } from './getAppsByKey'

import type { FilterKeysEnum } from '.'
import type { AppProps } from '@/types/external/Application'
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'

export const keys: FilterKeysEnum[] = [
  'SME',
  'Tier Level',
  'App Key',
  'Application Name',
]

export function getFilterItems(apps: Array<AppProps>): CheckboxGroups {
  const items: CheckboxGroups = {}

  for (const key of keys) {
    const keyItems = getAppsByKey(apps, key)

    if (keyItems.length > 0) {
      items[key] = {}
      for (const item of keyItems) {
        items[key][item] = false
      }
    }
  }
  return items
}
