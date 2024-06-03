import NodesContainer from '@/components/CardsGrid/NodesContainer'
import { generateNodeFilterItems } from '@/utils/node/getNodeFilterCheckboxes'

async function page() {
  const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/nodes/all')

  const nodes = await response.json()
  const filterItems = generateNodeFilterItems(nodes)
  return (
    <>
      <NodesContainer nodes={nodes} filterItems={filterItems} />
    </>
  )
}

export default page
