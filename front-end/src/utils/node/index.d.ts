import type { NodeProps } from '@/types/external/Node'

export type FilterKeysEnum = Extract<
  keyof NodeProps,
  'Environment' | 'Port' | 'ACE Version' | 'Clustered'
>
export type GroupKeysEnum = Extract<
  keyof NodeProps,
  'Environment' | 'Port' | 'ACE Version'
>

export type GroupedNodes = Record<string, NodeProps[]>
