import { ShowFilteredApps } from '@/components/CardsGrid/AppsContainer/AppsContainer'

import { Tab } from '@headlessui/react'

import type { GroupedApps } from '@/utils/application'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
type TabViewsProps = {
  groups: GroupedApps
  currentPage: number
  appPerPage: number
}

export default function TabViews({
  groups,
  currentPage,
  appPerPage,
}: TabViewsProps) {
  const keys: (keyof GroupedApps)[] = Object.keys(groups)
  const values = Object.values(groups)
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        {keys.map((category) => (
          <Tab
            key={category}
            className={({ selected }) =>
              classNames(
                'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                selected ? 'bg-white text-blue-700 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
              )
            }
          >
            {category}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-2 flex grow">
        {values.map((apps, idx) => (
          <Tab.Panel key={idx}>
            <ShowFilteredApps
              apps={apps}
              currentPage={currentPage}
              appPerPage={appPerPage}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}
