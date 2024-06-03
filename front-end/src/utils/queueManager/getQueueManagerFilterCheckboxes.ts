import { getQueueManagerByKey } from './getQueueManagerByKey'

import { generateFilterCheckboxes } from '../filterItem/generateFilterCheckboxes'

import type { FilterKeysEnum } from '.'
import type { QueueManagerProps } from '@/types/external/QueueManager'
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'

export const keys: FilterKeysEnum[] = [
  'Name',
  'MQ Version',
  'Clustred',
  'Environment',
  'Applications Runs Here',
]

/**
 * Generates filter items specifically for queue managers based on predefined keys.
 * @param queueManagers Array of QueueManager representing queue managers
 * @returns Object containing filter items for queue managers
 */
export function generateQueueManagerFilterCheckboxes(
  queueManagers: QueueManagerProps[]
): CheckboxGroups {
  // Use the previous generateFilterItems function with specific keys and getQueueManagerByKey function
  return generateFilterCheckboxes(queueManagers, keys, getQueueManagerByKey)
}
