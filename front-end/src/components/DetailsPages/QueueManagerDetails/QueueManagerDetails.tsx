'use client'
import { QueueManagerProps } from '@/types/external/QueueManager'
import Carousel from '../../Carousel/Carousel'
import { LinksCard } from '../../Carousel/LinksCard'

import { ShowTags } from '@/components/Tags/ShowTags'
import TierLevel from '@/components/Tags/TierLevel'
import { TierLevelEnum } from '@/types/external/Application'
import {
  getSMEsFromStr,
  getTechnologiesFromStr,
} from '@/utils/application/splitStr'
import { getLinkFromQueueManager } from '@/utils/queueManager/getLinksFromQueueManager'
import { LinkIcon } from '@heroicons/react/24/solid'

// import {  useEffect , useState} from "react";
export const links = [
  { name: 'Test 1', href: '#' },
  { name: 'Test 1', href: '#' },
  { name: 'Test 1', href: '#' },
]

const requiredKeys = [
  'Application Name',
  'App Key',
  'Who calls me?',
  'Who are my dependencies?',
  'Notes',
  'SME',
  'Tier Level',
  'PII Data',
  'PCI',
  'EQA Test Cases',
  'App Number',
  'Queue Manager(s)',
  'Nodes',
  'Nodes:Port',
  'Nodes:Title (linked to item)',
]

export default function QueueManagerDetails({ app }) {
  console.log({ app })

  return (
    <>
      <div className="flex flex-col-reverse py-5 2xl:flex-row">
        <div className="mt-12 w-full space-y-5 px-6 2xl:mt-0">
          <Carousel imgs={app['Application Image']?.split(' ')} />
          <LinkSection queueManager={app} />
        </div>
        <div className="w-full min-w-32 pl-6">
          <div className="grid w-full grid-cols-3 gap-x-4 gap-y-6">
            <ShowAppInfo data={app} />
          </div>
        </div>
      </div>
    </>
  )
}

function ShowAppInfo({ data }: { data: QueueManagerProps }) {
  return Object.entries(data)
    .filter((c) => requiredKeys.includes(c[0]))
    .map((arr) => {
      const [key, value] = arr
      return <ShowData key={key} name={key as string} value={value} />
    })
}

interface ShowDataProps {
  name: keyof QueueManagerProps | string
  value: QueueManagerProps[keyof QueueManagerProps]
}

// control how diffirent data is displayed
function ShowData({ name, value }: Readonly<ShowDataProps>) {
  if (name === 'MQ Version') {
    return (
      <>
        <h1 className="min-w-64 shrink font-poppins text-xs font-semibold 2xl:text-sm ">
          {name} &nbsp; :{' '}
        </h1>
        <p className="col-span-2 w-full break-words text-xs text-gray-600 2xl:text-base">
          <TierLevel value={value as TierLevelEnum} />
        </p>
      </>
    )
  } else if (name === 'SME') {
    const arr = getSMEsFromStr(value as string)
    return (
      <div className="col-span-full">
        <h1 className="min-w-64 shrink font-poppins text-xs font-semibold 2xl:text-sm ">
          {name} &nbsp; :{' '}
        </h1>
        <div className="mt-2 flex w-full flex-wrap gap-2 rounded-lg border bg-gray-50 p-2">
          <ShowTags tags={arr} />
        </div>
      </div>
    )
  } else if (name === 'Who are my dependencies?') {
    const arr = getTechnologiesFromStr(value as string)
    return (
      <div className="col-span-full">
        <h1 className="min-w-64 shrink font-poppins text-xs font-semibold 2xl:text-sm ">
          {name} &nbsp; :{' '}
        </h1>
        <div className="mt-2 flex w-full flex-wrap gap-2 rounded-lg border bg-gray-50 p-2">
          <ShowTags tags={arr} />
        </div>
      </div>
    )
  }

  // for the rest if the cases
  return (
    <>
      <h1 className="min-w-64 shrink font-poppins text-xs font-semibold 2xl:text-sm ">
        {name} &nbsp; :{' '}
      </h1>
      <p className="col-span-2 w-full break-words text-xs text-gray-600 2xl:text-base">
        {value.toString()}
      </p>
    </>
  )
}

function LinkSection({ queueManager }: { queueManager: QueueManagerProps }) {
  // get links from the application
  const linkGroups = getLinkFromQueueManager(queueManager).filter(
    (link) => link
  )
  return (
    <div>
      <div>
        <h1 className="mb-4 inline-flex font-poppins text-xl font-medium">
          <span>
            <LinkIcon className="size-6 text-slate-500 " />
          </span>
          Links
        </h1>
      </div>
      <div className="mt-3 grid grid-cols-1  gap-4 px-6 xl:grid-cols-3">
        {linkGroups.length > 0 &&
          linkGroups
            .filter((obj) => obj.links?.length > 0)
            .map(({ name, links }, idx) => {
              return <LinksCard name={name} key={idx} links={links} />
            })}
      </div>
    </div>
  )
}
