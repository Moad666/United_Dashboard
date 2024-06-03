import { queueManagers } from '@/constants/queueManager'

import { NextResponse } from 'next/server'

export const GET = async (request, response) => {
  try {
    // returns all the apps
    return new NextResponse(JSON.stringify(queueManagers), {
      status: 200,
      statusText: 'Queue Managers Found',
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(null, {
      status: 500,
      statusText: error,
    })
  }
}
