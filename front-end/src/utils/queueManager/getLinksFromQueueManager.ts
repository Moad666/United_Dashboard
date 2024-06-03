
import type { ExtractKeysOfType } from '@/types/ExtractKeys'
import { QueueManagerProps } from '@/types/external/QueueManager'
import { getLinksFromStr } from '../application/splitStr'

export const requiredLinks: ExtractKeysOfType<QueueManagerProps, string>[] = [
  'RFHUtil Link',
]

// get only the links from an application
export function getLinkFromQueueManager(app: QueueManagerProps) {
  //
  return requiredLinks.map((name) => {
    const str = app[name]
    if (str) {
      const links = getLinksFromStr(str).map((link) => {
        return { name: link, links }
      })
      return links
    }
    return null
  })
}
