import { apps } from '@/constants/apps'
import { getSMEsFromStr } from '@/utils/application/splitStr'

import { NextResponse } from 'next/server'

import type { User } from '@/components/TagInput'

export const GET = async (request, response) => {
  try {
    const str = apps.map((app) => app.SME).join(';')

    const smes: User[] = getSMEsFromStr(str).map((sme, id) => {
      const name = sme
      const email =
        sme
          .split(',')
          .map((c) => c.trim())
          .join('.') + '@gmail.com'
      return {
        id,
        name,
        email,
        avatar: null,
      }
    })

    // returns all the apps
    return new NextResponse(JSON.stringify(smes))
  } catch (error) {
    console.error(error)
    return new NextResponse(null, {
      status: 500,
      statusText: error,
    })
  }
}
