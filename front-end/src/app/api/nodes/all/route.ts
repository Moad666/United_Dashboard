import { nodes } from '@/constants/nodes'

import { NextResponse } from 'next/server'

export const GET = async (request, response) => {
  try {
    // returns all the apps
    return new NextResponse(JSON.stringify(nodes))
  } catch (error) {
    console.error(error)
    return new NextResponse(null, {
      status: 500,
      statusText: error,
    })
  }
}
