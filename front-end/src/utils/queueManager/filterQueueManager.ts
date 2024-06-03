import type { QueueManagerProps } from '@/types/external/QueueManager'
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'

/**
 * Filter queue managers based on the `Name` string
 * @param {Array<QueueManagerProps>} queueManagers all the queue managers
 * @param {string} name the text that will be filtered by
 * @returns {Array<QueueManagerProps>} Filtered queue managers
 */
export function filterByQueueManagerName(
  queueManagers: Array<QueueManagerProps>,
  name: string
) {
  return queueManagers.filter((manager) => {
    return manager.Name.toLowerCase().includes(name.toLowerCase())
  })
}

/**
 * Filter queue managers based on checkboxes
 * @param {Array<QueueManagerProps>} queueManagers all the queue managers
 * @param {CheckboxGroups} checkboxes an object containing all the checkboxes for filtering
 * @returns {Array<QueueManagerProps>} Filtered queue managers
 */
export function filterByQueueManagerCheckboxes(
  queueManagers: Array<QueueManagerProps>,
  checkboxes: CheckboxGroups
) {
  return queueManagers.filter((manager) => {
    return Object.entries(checkboxes).every(([group, names]) =>
      Object.entries(names).every(([name, isChecked]) =>
        isChecked ? manager[group]?.includes(name) : true
      )
    )
  })
}

/**
 * Filter queue managers based on checkboxes and manager names
 * @param {Array<QueueManagerProps>} queueManagers Queue managers to be filtered
 * @param {CheckboxGroups} checkboxes Object containing all the checkboxes for filtering
 * @param {string} name Text in the search input for filtering by name
 * @returns {Array<QueueManagerProps>} Filtered queue managers
 */
export function filterQueueManagers(
  queueManagers: Array<QueueManagerProps>,
  checkboxes: CheckboxGroups,
  name: string = ''
): Array<QueueManagerProps> {
  const filteredQueueManagers = filterByQueueManagerName(queueManagers, name)
  const result = filterByQueueManagerCheckboxes(
    filteredQueueManagers,
    checkboxes
  )

  return result
}
