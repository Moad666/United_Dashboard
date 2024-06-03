import QueueManagerDetails from '@/components/DetailsPages/QueueManagerDetails/QueueManagerDetails'

import { notFound } from 'next/navigation'

type Params = {
  queueManagerId: string
}

// generate pages for each application key
export async function generateStaticParams() {
  const reponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/queuemanagers`
  )
  const queueManagers = await reponse.json()
  const appKeys: Params[] = queueManagers.map((queueManager) => {
    return { queueManagerId: queueManager['App Key'] }
  })

  return appKeys
}

// the application details page
async function page({ params }: { params: Params }) {
  // decode the url to a normal string
  const queueManagerId = decodeURI(params.queueManagerId)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/queuemanagers/${queueManagerId}`
  )

  const data = await response.json()

  if (data === null) {
    notFound()
  }

  return (
    <div className="flex h-full grow items-stretch">
      {data && <QueueManagerDetails app={data} />}
    </div>
  )
}

export default page
