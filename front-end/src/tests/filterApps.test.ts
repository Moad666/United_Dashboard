// filterApps.test.ts
import { sampleApps } from './samples'

import { filterApps } from '@/utils/application/filterApps'

describe('filterApps', () => {
  const sampleCheckboxes = {
    SME: { 'John Doe': true, 'Jane Smith': false },
    'Tier Level': { '1 - Critical': true, '2 - Somewhat Critical': false },
    'App Key': { app1: true, app2: false },
    'Application Name': { 'App One': true, 'App Two': false },
  }

  it('should filter apps based on checkboxes (John Doe, Critical Tier Level, App1, App One)', () => {
    const filteredApps = filterApps(sampleApps, sampleCheckboxes)

    const expectedResult = [sampleApps[0]]

    expect(filteredApps).toEqual(expectedResult)
  })

  it('should filter apps based on checkboxes (Jane Smith, Somewhat Critical Tier Level, App2, App Two)', () => {
    const sampleCheckboxesJaneSmith = {
      SME: { 'John Doe': false, 'Jane Smith': true },
      'Tier Level': { '1 - Critical': false, '2 - Somewhat Critical': true },
      'App Key': { app1: false, app2: true },
      'Application Name': { 'App One': false, 'App Two': true },
    }

    const filteredApps = filterApps(sampleApps, sampleCheckboxesJaneSmith)

    const expectedResult = [sampleApps[1]]

    expect(filteredApps).toEqual(expectedResult)
  })

  it('should return all apps if no checkboxes are selected', () => {
    const sampleCheckboxesNoneSelected = {
      SME: { 'John Doe': false, 'Jane Smith': false },
      'Tier Level': { '1 - Critical': false, '2 - Somewhat Critical': false },
      'App Key': { app1: false, app2: false },
      'Application Name': { 'App One': false, 'App Two': false },
    }

    const filteredApps = filterApps(sampleApps, sampleCheckboxesNoneSelected)

    expect(filteredApps).toEqual(sampleApps)
  })

  // Add more test cases as needed
})
