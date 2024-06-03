import type { GroupedNodes, GroupKeysEnum } from '.'
import type { NodeProps } from '@/types/external/Node'

export function groupNodesByKey(
  nodes: NodeProps[],
  key: GroupKeysEnum
): GroupedNodes {
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
  }, {} as GroupedNodes)
}
