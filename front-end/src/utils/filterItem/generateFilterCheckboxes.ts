import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'

/**
 * Generates filter items based on keys of the provided type T.
 * Each key will be used as a group, and the filter items will be initialized as false.
 * @param nodes Array of items of type T
 * @param keys Keys of type T to use for generating filter groups
 * @param getObjectByKey Function to retrieve values for a specific key from the items
 * @returns Object containing filter items with keys based on the provided keys
 */
export function generateFilterCheckboxes<T>(
  nodes: T[],
  keys: (keyof T)[],
  getObjectByKey: (items: T[], key: keyof T) => string[]
): CheckboxGroups {
  const filterItems: CheckboxGroups = {}

  // Iterate over each key
  for (const key of keys) {
    // Retrieve values for the current key
    const keyValues = getObjectByKey(nodes, key)

    // If values exist for the key, initialize filter items for the group
    if (keyValues.length > 0) {
      const keyAsString = key.toString() // Convert key to string
      filterItems[keyAsString] = {}

      // Initialize filter items for the group as false
      for (const value of keyValues) {
        filterItems[keyAsString][value] = false
      }
    }
  }

  return filterItems
}
