import type { FormEventHandler, PropsWithChildren } from 'react'

export type ModalProps = PropsWithChildren<{
  onSubmit: FormEventHandler<HTMLFormElement>
  method: 'GET' | 'POST'
  title: string
}>
