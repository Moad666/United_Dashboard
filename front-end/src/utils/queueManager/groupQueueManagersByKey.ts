import type { GroupedQueueManagers, GroupKeysEnum } from '.'
import type { QueueManagerProps } from '@/types/external/QueueManager'

export function groupQueueManagersByKey(
  nodes: QueueManagerProps[],
  key: GroupKeysEnum
): GroupedQueueManagers {
  return nodes.reduce((acc, app) => {
    // get the key value from the app
    const keyValue = app[key]

    // initialize the arrayf
    if (keyValue !== undefined && keyValue !== null) {
      if (!acc[keyValue]) {
        acc[keyValue] = []
      }

      acc[keyValue].push(app)
    }

    return acc
  }, {} as GroupedQueueManagers)
}
