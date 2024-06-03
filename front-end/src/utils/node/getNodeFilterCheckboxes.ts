import { getNodesByKey } from './getNodesByKey'

import { generateFilterCheckboxes } from '../filterItem/generateFilterCheckboxes'

import type { FilterKeysEnum } from '.'
import type { NodeProps } from '@/types/external/Node' // Assuming your types are in the same file
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'

export const keys: FilterKeysEnum[] = ['ACE Version', 'Environment', 'Port']

/**
 * Generates filter items specifically for nodes based on predefined keys.
 * @param nodes Array of NodeProps representing nodes
 * @returns Object containing filter items for nodes
 */
export function generateNodeFilterItems(nodes: NodeProps[]): CheckboxGroups {
  // Use the previous generateFilterItems function with specific keys and getNodeByKey function
  return generateFilterCheckboxes(nodes, keys, getNodesByKey)
}
