import type { AppProps } from '@/types/external/Application'
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'

/**
 * Filter applications based on the `Appname` string
 * @param {Array<AppProps>} apps all the applications
 * @param {string} Appname the text that will be filtered by
 * @returns {Array<AppProps>} Application
 */
export function filterByAppname(apps: Array<AppProps>, Appname: string) {
  return apps.filter((app) => {
    return app['Application Name'].toLowerCase().includes(Appname.toLowerCase())
  })
}

export function filterByCheckboxes(
  apps: AppProps[],
  checkboxes: CheckboxGroups
) {
  return apps.filter((app) => {
    return Object.entries(checkboxes).every(([group, names]) =>
      Object.entries(names).every(([name, isChecked]) =>
        isChecked ? app[group].includes(name) : true
      )
    )
  })
}

/**
 * filter then applications based on the checkboxes and application names
 * @param apps applications to be filtered
 * @param checkboxes an object  contains all the checkboxes that are in a filter
 * @param appName a string in the search input
 * @returns
 */
export function filterApps(
  apps: AppProps[],
  checkboxes: CheckboxGroups,
  appName: string = ''
): Array<AppProps> {
  const filteredApps = filterByAppname(apps, appName)
  const result = filterByCheckboxes(filteredApps, checkboxes)

  return result
}
