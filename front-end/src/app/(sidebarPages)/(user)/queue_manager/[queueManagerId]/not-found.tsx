import { headers } from 'next/headers'
import Link from 'next/link'

export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get('host')
  console.log(domain)
  return (
    <div className="flex grow items-center justify-center">
      <div className="mb-8 flex flex-col justify-center gap-6">
        <h2 className="text-5xl font-bold">Application not Found</h2>
        <p className="text-center text-sm text-gray-500">
          Could not find requested application
        </p>
        <p className="inline-flex justify-center text-center">
          go to
          <Link className="link" href="/applications">
            All Applications
          </Link>
        </p>
      </div>
    </div>
  )
}
