import Card, { InfoContainer } from '../Card'

import Tag from '@/components/Tags/Tag'
import TierLevel from '@/components/Tags/TierLevel'

import { useRouter } from 'next/navigation'

import type { TierLevelEnum } from '@/types/external/Application'
import type { QueueManagerProps } from '@/types/external/QueueManager'

type QueueManagerCardProps = {
  data: QueueManagerProps
  href: string
  isActive?: boolean
}

/**
 *  an individual application card in a grid or list view that display the infomation of it.
 *
 * @param {Object} props - The props passed down to the component.
 * @param {Object} props.data - The data object containing details about the application.
 * @param {string} props.href - The URL path to navigate to on clicking the card.
 */
function QueueManagerCard({
  data,
  href,
  isActive = true,
}: Readonly<QueueManagerCardProps>) {
  // all the application runs in this queue manager
  const apps =
    data['Applications Runs Here']
      ?.split(',')
      .filter((c, i, arr) => c && arr.indexOf(c) === i)
      .map((c) => c.trim()) ?? []
  return (
    <Card href={href} isActive={isActive}>
      <div className="flex h-52 w-full flex-col text-xs">
        <h4 className="mb-0 font-inter text-base font-extrabold capitalize text-gray-900 transition-all duration-500 ">
          {data.Name}
        </h4>
        <InfoContainer>
          <h1 className="font-semibold">MQ Version : </h1>
          <p className="flex items-center">
            <TierLevel value={data['MQ Version'] as TierLevelEnum} />
          </p>
        </InfoContainer>
        <InfoContainer>
          <h1 className="font-semibold">Enviroment: </h1>
          <p className="flex items-center">{data.Environment}</p>
        </InfoContainer>

        <div className="mt-3">
          {apps?.length > 0 && (
            <>
              <h1 className="mb-1 font-semibold">Applications : </h1>

              <div className="scroll relative mt-1 flex max-h-[86px] w-full flex-wrap gap-2 overflow-auto rounded-md border bg-slate-50 p-2">
                {apps.map((tech) => (
                  <Tag value={tech} key={tech} showAppWithTech={null} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

export default QueueManagerCard
