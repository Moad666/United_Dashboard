'use client'
import { SessionProvider } from 'next-auth/react'

import type { PropsWithChildren } from 'react'

type Props = object

const Provider = ({ children }: PropsWithChildren<Props>) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Provider
