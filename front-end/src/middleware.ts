import { auth } from '../auth'

import { NextResponse } from 'next/server'

export default auth(async (req) => {
  const session = await auth()
  const currentPath = req.nextUrl.pathname
  const NEXT_URL = process.env.NEXTAUTH_URL

  // ? No Session exist in the cookies -> go to login page
  // if (!session && currentPath !== '/login') {
  //   return NextResponse.redirect(NEXT_URL + '/login')
  // }

  // ? Session exist when you are in login page? --> go to home page
  // if (currentPath === '/login' && session) {
  //   return NextResponse.redirect(NEXT_URL + '/')
  // }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
