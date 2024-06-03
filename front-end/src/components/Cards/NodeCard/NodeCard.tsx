import Card, { InfoContainer } from '../Card'

import TierLevel from '@/components/Tags/TierLevel'

import Link from 'next/link'

import type { TierLevelEnum } from '@/types/external/Application'
import type { NodeProps } from '@/types/external/Node'

type NodeCardProps = {
  data: NodeProps
  href: string
  isActive?: boolean
}

/**
 *  an individual application card in a grid or list view that display the infomation of it.
 *
 * @param {Object} props - The props passed down to the component.
 * @param {Object} props.data - The data object containing details about the application.
 * @param {string} props.href - The URL path to navigate to on clicking the card.
 * @param {Function} props.showAppWithTech - Function to handle the display based on technology used in apps.
 */
function NodeCard({ data, href, isActive = true }: Readonly<NodeCardProps>) {
  return (
    <Card href={href} isActive={isActive}>
      <div className="flex h-52 w-full flex-col text-xs">
        <h4 className="mb-0 font-inter text-base font-extrabold capitalize text-gray-900 transition-all duration-500 ">
          {data.Name}
        </h4>
        <InfoContainer>
          <h1 className="font-semibold">ACE Version : </h1>
          <p className="flex items-center">
            <TierLevel value={data['ACE Version'] as TierLevelEnum} />
          </p>
        </InfoContainer>
        <InfoContainer>
          <h1 className="font-semibold">Enviroment: </h1>
          <p className="flex items-center">{data.Environment}</p>
        </InfoContainer>
        <InfoContainer>
          <h1 className="font-semibold">Web UI: </h1>
          <Link href={data.WebUi} className="flex items-center">
            {data.WebUi}
          </Link>
        </InfoContainer>
      </div>
    </Card>
  )
}

export default NodeCard
