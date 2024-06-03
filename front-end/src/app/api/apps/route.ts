import { apps } from '@/constants/apps'

import { NextResponse } from 'next/server'

// get all applications information
export const GET = async (request: Request, response: Response) => {
  try {
    // returns all the apps
    return new NextResponse(JSON.stringify(apps), {
      status: 200,
      statusText: 'Get all applications',
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Error While getting the applications: ' + error, {
      status: 500,
      statusText: error,
    })
  }
}

// create a new application
export const POST = async (request: Request, response: Response) => {
  try {
    const data = await request.json()

    console.log(data)

    return new NextResponse('Application Added with Success', {
      status: 201,
      statusText: 'Application Added with sucess',
    })
  } catch (error) {
    return new NextResponse('Error While adding the application: ' + error, {
      status: 500,
      statusText: error,
    })
  }
}
