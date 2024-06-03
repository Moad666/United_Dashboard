import type { NodeProps } from '@/types/external/Node'
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'

/**
 * Filter queue managers based on the `Name` string
 * @param {Array<NodeProps>} Nodes all the queue managers
 * @param {string} name the text that will be filtered by
 * @returns {Array<NodeProps>} Filtered queue managers
 */
export function filterByNodeName(nodes: Array<NodeProps>, name: string) {
  return nodes.filter((manager) => {
    return manager.Name.toLowerCase().includes(name.toLowerCase())
  })
}

/**
 * Filter queue managers based on checkboxes
 * @param {Array<NodeProps>} nodes all the queue managers
 * @param {CheckboxGroups} checkboxes an object containing all the checkboxes for filtering
 * @returns {Array<NodeProps>} Filtered queue managers
 */
export function filterByNodeCheckboxes(
  Nodes: Array<NodeProps>,
  checkboxes: CheckboxGroups
) {
  return Nodes.filter((manager) => {
    return Object.entries(checkboxes).every(([group, names]) =>
      Object.entries(names).every(([name, isChecked]) =>
        isChecked ? manager[group]?.includes(name) : true
      )
    )
  })
}

/**
 * Filter queue managers based on checkboxes and manager names
 * @param {Array<NodeProps>} Nodes Queue managers to be filtered
 * @param {CheckboxGroups} checkboxes Object containing all the checkboxes for filtering
 * @param {string} name Text in the search input for filtering by name
 * @returns {Array<NodeProps>} Filtered queue managers
 */
export function filterNodes(
  Nodes: Array<NodeProps>,
  checkboxes: CheckboxGroups,
  name: string = ''
): Array<NodeProps> {
  const filteredNodes = filterByNodeName(Nodes, name)
  const result = filterByNodeCheckboxes(filteredNodes, checkboxes)

  return result
}
