
import type { ExtractKeysOfType } from '@/types/ExtractKeys'
import { NodeProps } from '@/types/external/Node'
import { getLinksFromStr } from '../application/splitStr'

export const requiredLinks: ExtractKeysOfType<NodeProps, string>[] = ['WebUi']

// get only the links from an application
export function getLinkFromNode(app: NodeProps) {
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
