import QueueManagerContainer from '@/components/CardsGrid/QueueManagersContainer'
import { generateQueueManagerFilterCheckboxes } from '@/utils/queueManager/getQueueManagerFilterCheckboxes'

async function page() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_URL + '/api/queuemanagers'
  )

  const queueManagers = await response.json()
  const filterItems = generateQueueManagerFilterCheckboxes(queueManagers)
  return (
    <>
      <QueueManagerContainer
        queueManagers={queueManagers}
        filterItems={filterItems}
      />
    </>
  )
}

export default page
