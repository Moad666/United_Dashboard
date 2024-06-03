import type { AppProps } from '@/types/external/Application'

export type FilterKeysEnum = Extract<
  keyof AppProps,
  'SME' | 'Tier Level' | 'App Key' | 'Application Name'
>

export type GroupKeysEnum = Extract<
  keyof AppProps,
  | 'App Key'
  | 'PII Data'
  | 'PCI'
  | 'EQA Test Cases'
  | 'Tier Level'
  | 'Application Name'
>

export type GroupedApps = Record<string, AppProps[]>

export type GroupedItems<T> = Record<string, T[]>
