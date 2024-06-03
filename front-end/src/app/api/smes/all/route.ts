import { smes } from '@/constants/smes'

import { NextResponse } from 'next/server'

export const GET = async (request: Request, response: Response) => {
  try {
    // TODO get users usnig the back-end
    // send data to when calling this path
    return new NextResponse(JSON.stringify(smes ?? []), {
      status: 200,
      statusText: 'Users found',
    })
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
      statusText: 'Error While getting SMEs' + error,
    })
  }
}
