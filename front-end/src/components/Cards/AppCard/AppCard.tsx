import { ShowImage } from './ShowImage'

import Card from '../Card'

import { ShowTags } from '@/components/Tags/ShowTags'
import TierLevel from '@/components/Tags/TierLevel'
import { getTechnologiesFromStr } from '@/utils/application/splitStr'

import type { AppProps } from '@/types/external/Application'

type AppCardProps = {
  data: AppProps
  href: string
  isActive?: boolean
}

function AppCard({ data, href, isActive = true }: Readonly<AppCardProps>) {
  // Extracting the first image URL from the "Application Image" field if it exists, else defaulting to null.
  const str: string = data['Application Image']
  const srcImg = str?.split(' ')[0] ?? null

  // Processing "Who are my dependencies?" field to filter out duplicates and trim whitespace.
  const techs: string[] = getTechnologiesFromStr(
    data['Who are my dependencies?']
  )

  return (
    <Card href={href} isActive={isActive}>
      <div className="z-0  flex min-w-52  max-w-52 grow items-center justify-center rounded-md">
        <ShowImage srcImg={srcImg} />
      </div>
      <div className="flex h-52 w-full flex-col text-sm">
        <h4 className="mb-0 font-inter text-base font-extrabold capitalize text-gray-900 transition-all duration-500 ">
          {data['Application Name']}
        </h4>
        <p className="mt-3 flex items-center">
          <TierLevel value={data['Tier Level']} />
        </p>
        <div className="mt-2">
          {techs?.length > 0 && (
            <>
              <h1 className="font-roboto text-xs font-semibold">
                Technologies :{' '}
              </h1>

              <div className="scroll relative mt-1 flex max-h-[86px] w-full flex-wrap gap-2 overflow-auto rounded-md border bg-slate-50 p-2">
                <ShowTags tags={techs} />
              </div>
            </>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-xs font-normal leading-5 text-gray-400 transition-all duration-500">
          {data.Notes}
        </p>
      </div>
    </Card>
  )
}

export default AppCard
