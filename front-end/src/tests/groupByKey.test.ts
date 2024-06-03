import { sampleApps } from './samples'

import { groupAppsByKey } from '@/utils/application/groupAppsByKey'

import type { AppProps } from '@/types/external/Application'

describe('groupBy function', () => {
  it('should group by Tier Level', () => {
    const result = groupAppsByKey(sampleApps, 'Tier Level')

    // Extracting the expected grouped values based on the sample data
    const expectedGroupedValues: Record<string, AppProps[]> = {
      '1 - Critical': [sampleApps[0]],
      '2 - Somewhat Critical': [sampleApps[1]],
      '3 - Less Critical': [sampleApps[2]],
      '4 - Not Critical': [sampleApps[3]],
    }

    expect(result).toEqual(expectedGroupedValues)
  })

  // Add more test cases for different keys or scenarios
})
