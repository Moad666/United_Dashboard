import AppDetails from '@/components/DetailsPages/AppDetails/AppDetails'
import { apps } from '@/constants/apps'

import { notFound } from 'next/navigation'

type Params = {
  appRef: string
}

// generate pages for each application key
export async function generateStaticParams() {
  const appKeys = apps.map((app) => {
    return { appRef: app['App Key'] }
  })

  return appKeys
}

// the application details page
async function page({ params }: { params: Params }) {
  // decode the url to a normal string
  const appKey = decodeURI(params.appRef)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/apps/appkey/${appKey}`
  )

  const data = await response.json()

  if (data === null) {
    notFound()
  }

  return (
    <div className="flex h-full grow items-stretch">
      {data && <AppDetails app={data} />}
    </div>
  )
}

export default page
