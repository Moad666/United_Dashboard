import { getLinksFromStr } from './splitStr'

import type { AppProps } from '@/types/external/Application'

import type { ExtractKeysOfType } from '@/types/ExtractKeys'

export const requiredLinks: ExtractKeysOfType<AppProps, string>[] = [
  'incl URL & Port',
  'Architecture Diagram',
  'Technical Document',
  'Crosswalk/ Data Mapping',
  'Code Reviewer',
  'Schemas',
  'Link to API',
]

// get only the links from an application
export function getLinkFromApp(app: AppProps) {
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
