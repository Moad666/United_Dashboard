import type { GroupedApps, GroupKeysEnum } from '.'
import type { AppProps } from '@/types/external/Application'

export function groupAppsByKey(
  apps: AppProps[],
  key: GroupKeysEnum
): GroupedApps {
  return apps.reduce((acc, app) => {
    // get the key value from the app
    const keyValue = app[key]

    // initialize the array
    if (keyValue !== undefined && keyValue !== null) {
      if (!acc[keyValue]) {
        acc[keyValue] = []
      }

      acc[keyValue].push(app)
    }

    return acc
  }, {} as GroupedApps)
}
