export type EnviromentEnum = 'Dev' | 'Test' | 'PreProd/Stage' | 'Prod'

export type QueueManagerProps = {
  Name: string
  'MQ Version': string
  Port?: number
  'SVR Channel'?: string
  'External Partner(s)'?: string
  Clustred?: boolean
  'Ip Address'?: string
  VIP?: string
  'DR VIP'?: string
  'DR IP'?: string
  'RFHUtil Link'?: string
  Environment?: EnviromentEnum
  'Applications Runs Here'?: string
  'Application(s)'?: string
}
