import { splitStr } from '@/utils/string'

import type { QueueManagerProps } from '@/types/external/QueueManager'

export function getQueueManagerByKey(
  items: Array<QueueManagerProps>,
  key: keyof QueueManagerProps
): string[] {
  const res: string[] = []

  for (const item of items) {
    const value = item[key]
    if (key === 'Applications Runs Here') {
      for (const item of items) {
        const value = item[key]
        res.push(...splitStr(value))
      }
    } else if (value && !res.includes(value.toString())) {
      res.push(value.toString())
    }
  }

  // Sort values and remove any repeated value
  return Array.from(new Set(res)).sort((str, str1) => {
    return str.localeCompare(str1)
  })
}
