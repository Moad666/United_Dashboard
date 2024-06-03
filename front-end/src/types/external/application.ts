import type { User } from '@/components/TagInput'

export const BooleanEnumKeys = ['TRUE', 'FALSE'] as const
export const TierLevelEnumKeys = [
  '2 - Somewhat Critical',
  '4 - Not Critical',
  '1 - Critical',
  '3 - Less Critical',
] as const

export type TierLevelEnum = (typeof TierLevelEnumKeys)[number]
export type BooleanEnum = (typeof BooleanEnumKeys)[number]

export type AppProps = {

  // number
  'App Number'?: number

  // object
  'Queue Manager(s)'?: string
  SME: User[]

  // string
  'App Key': string
  'Application Name'?: string
  Notes?: string
  Nodes?: string
  'Who are my dependencies?'?: string
  'Who Calls Me?'?: string
  'App Ref': string

  // Enum
  'Tier Level': TierLevelEnum

  // booleans
  PCI?: BooleanEnum
  'EQA Test Cases'?: BooleanEnum
  'PII Data'?: BooleanEnum

  // links
  'incl URL & Port'?: string
  'Application Image'?: string
  'Architecture Diagram'?: string
  'Technical Document'?: string
  'Crosswalk/ Data Mapping'?: string
  'Code Reviewer'?: string
  Schemas?: string
  'Link to API'?: string
}
