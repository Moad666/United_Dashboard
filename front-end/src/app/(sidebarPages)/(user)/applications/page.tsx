import AppsContainer from '@/components/CardsGrid/AppsContainer/AppsContainer'
import PageTitle from '@/components/PageTitle'
import { getFilterItems } from '@/utils/application/getFilterItems'

async function page() {
  const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/apps')

  const apps = await response.json()
  const filterItems = getFilterItems(apps)
  return (
    <>
      <div className="mb-4">
        <PageTitle title="Applications" />
      </div>
      <AppsContainer apps={apps} filterItems={filterItems} />
    </>
  )
}

export default page
