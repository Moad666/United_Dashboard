import type { AppProps } from '@/types/external/Application'
import type { GroupedApps } from '@/utils/application'
import type { CheckboxGroups } from '@/utils/filterItem/CheckboxGroups'

export type ShowFilteredAppsProps = {
  apps: AppProps[]
  currentPage: number
  appPerPage: number
}

export type ShowGroupedAppsProps = {
  apps: GroupedApps
  selectedGroup: string
}

export type AppsContainerProps = {
  apps: AppProps[]
  filterItems: CheckboxGroups
}
