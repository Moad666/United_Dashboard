import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {
  try {
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    console.log({ email, password })

    return new NextResponse(
      JSON.stringify({ message: 'You are logged with success!' }),
      {
        status: 200,
        statusText: 'You are logged with success!',
      }
    )
  } catch (error) {
    return new NextResponse(JSON.stringify({ msg: 'Error while login ' }), {
      status: 500,
      statusText: error,
    })
  }
}
