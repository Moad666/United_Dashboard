import { getAppsByKey } from '@/utils/application/getAppsByKey'

import type { AppProps, TierLevelEnum } from '@/types/external/Application'
import type { FilterKeysEnum } from '@/utils/application'

// Assuming getItemsForKey uses the same structure as AppProps

// unit testing for the getValuesByKey
describe('GetValuesByKey Function ', () => {
  const apps: Array<AppProps> = [
    {
      'App Ref': '1',
      'App Key': 'app1',
      'App Number': 1,
      'Application Name': 'App1',
      'PII Data': 'TRUE',
      'Tier Level': 'tier1' as TierLevelEnum,
      PCI: 'TRUE',
      'EQA Test Cases': 'TRUE',
      SME: 'sme1',
      'Queue Manager(s)': 'queue1',
      Nodes: 'node1',
      'Who are my dependencies?': '',
    },
    {
      'App Ref': '2',
      'App Key': 'app2',
      'App Number': 2,
      'Application Name': 'App2',
      'PII Data': 'FALSE',
      'Tier Level': 'tier2' as TierLevelEnum,
      PCI: 'TRUE',
      'EQA Test Cases': 'TRUE',
      SME: 'sme2',
      'Queue Manager(s)': 'queue2',
      Nodes: 'node2',
      'Who are my dependencies?': '',
    },

    // Add more sample data as needed
  ]

  it('should return an array of unique values for the specified key', () => {
    const key = 'Application Name'
    const result = getAppsByKey(apps, key)
    expect(result).toEqual(['App1', 'App2'])
  })

  it('should handle cases where some objects do not have the specified key', () => {
    const key = 'nonExistentKey'
    const result = getAppsByKey(apps, key as FilterKeysEnum)
    expect(result).toEqual([])
  })

  it('should handle cases where the values for the specified key are not unique', () => {
    const key = 'Tier Level'
    const result = getAppsByKey(apps, key)
    expect(result).toEqual(['tier1', 'tier2'])
  })

  // Add more test cases as needed for other keys
})
