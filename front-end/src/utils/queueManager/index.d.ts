import type { QueueManagerProps } from '@/types/external/QueueManager'

export type FilterKeysEnum = Extract<
  keyof QueueManagerProps,
  | 'Name'
  | 'MQ Version'
  | 'VIP'
  | 'SVR Channel'
  | 'Applications Runs Here'
  | 'Clustred'
  | 'Environment'
>
export type GroupKeysEnum = Extract<
  keyof QueueManagerProps,
  'Name' | 'MQ Version' | 'VIP' | 'SVR Channel' | 'Applications Runs Here'
>

export type GroupedQueueManagers = Record<string, QueueManagerProps[]>
