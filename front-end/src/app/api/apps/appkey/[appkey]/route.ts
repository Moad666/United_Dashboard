import { apps } from '@/constants/apps'

import { NextResponse } from 'next/server'

// get application by app key
export const GET = async (
  request: Request,
  { params }: { params: { appkey: string } }
) => {
  try {
    // get application reference
    const { appkey } = params

    // get the application with the appRef equal to what being requested
    const searchedApp = apps.find((app, index) => {
      return app['App Key'] === appkey
    })

    // send the result
    return new NextResponse(JSON.stringify(searchedApp), { status: 200 })
  } catch (error) {
    // send error
    return new NextResponse('Error While Looking for an application', {
      status: 500,
      statusText: error,
    })
  }
}

// update an application by appkey
export const PUT = async (
  request: Request,
  { params }: { params: { appkey: string } }
) => {
  try {
    // get application reference
    const { appkey } = params

    // get the application with the appRef equal to what being requested
    const searchedApp = apps.find((app, index) => {
      return app['App Key'] === appkey
    })

    // send the result
    return new NextResponse(JSON.stringify(searchedApp), { status: 203 })
  } catch (error) {
    // send error
    return new NextResponse('Error While Updating the application', {
      status: 500,
      statusText: error,
    })
  }
}


// delete application by appkey
export const DELETE = async (
  request: Request,
  { params }: { params: { appkey: string } }
) => {
  try {
    // get application reference
    const { appkey } = params

    // delete application from the database

    // send the result
    return new NextResponse('Applicaton Deleted With Success', { status: 202 })
  } catch (error) {
    // send error
    return new NextResponse('Error While Deleting the application', {
      status: 500,
      statusText: error,
    })
  }
}
