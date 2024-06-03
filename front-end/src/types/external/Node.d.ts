import type { EnviromentEnum } from './QueueManager'

export type NodeProps = {
  Name: string
  Environment: EnviromentEnum
  Port?: number
  WebUi?: string
  'ACE Version'?: string
  'IS Name(s)'?: number
  'Upgraded Date'?: Date
}
