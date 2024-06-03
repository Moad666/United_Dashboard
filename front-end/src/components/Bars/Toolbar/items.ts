import type { ItemProps } from '@/components/Dropdown'
import type { AppProps } from '@/types/external/Application'
import type { NodeProps } from '@/types/external/Node'
import type { QueueManagerProps } from '@/types/external/QueueManager'

// export const sortItems: ItemProps<> = [
//   { id: '1', name: 'name' },
//   { id: '2', name: 'name' },
//   { id: '3', name: 'name' },
// ]
export const appGroups: ItemProps<AppProps>[] = [
  { id: '1', name: 'App Key' },
  { id: '2', name: 'Application Name' },
  { id: '6', name: 'Tier Level' },
  { id: '3', name: 'PII Data' },
  { id: '4', name: 'PCI' },
  { id: '5', name: 'EQA Test Cases' },
]

export const nodeGroups: ItemProps<NodeProps>[] = [
  { id: '1', name: 'ACE Version' },
  { id: '2', name: 'Environment' },
]
export const queueManagerGroups: ItemProps<QueueManagerProps>[] = [
  { id: '1', name: 'MQ Version' },
  { id: '2', name: 'Ip Address' },
  { id: '6', name: 'Environment' },
]
