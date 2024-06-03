import AppDetails from '@/components/DetailsPages/AppDetails/AppDetails'
import NodeDetails from '@/components/DetailsPages/NodeDetails/NodeDetails'
import { nodes } from '@/constants/nodes'

import { notFound } from 'next/navigation'

type Params = {
  nodeRef: string
}

// generate pages for each application key
export async function generateStaticParams() {
  const nodeKeys: Params[] = nodes.map((node) => {
    return { nodeRef: node.Name }
  })

  return nodeKeys
}

// the application details page
async function page({ params }: { params: Params }) {
  // decode the url to a normal string
  const nodeKey = decodeURI(params.nodeRef)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/nodes/name/${nodeKey}`
  )

  const data = await response.json()

  if (data === null) {
    notFound()
  }

  return (
    <div className="flex h-full grow items-stretch">
      {data && <NodeDetails node={data} />}
    </div>
  )
}

export default page
