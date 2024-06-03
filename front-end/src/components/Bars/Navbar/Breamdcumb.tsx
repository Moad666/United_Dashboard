'use client'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

import type { PropsWithChildren } from 'react'

// type BreadcumbProps = object

const Breamdcumb = () => {
  const pathname = usePathname()

  const pages = pathname.split('/').filter((c) => c && c !== '')
  let oldpath = ''
  return (
    <div className="inline-flex items-end justify-center gap-4 py-3">
      <PathLink href={'/'} isActive={pathname === '/'}>
        <HomeIcon className="mr-2 size-4" />
        Home
      </PathLink>
      {pages.map((page, idx) => {
        oldpath += '/' + page
        return (
          <Fragment key={oldpath}>
            <ChevronRightIcon className="size-4 text-gray-700" />
            <PathLink href={oldpath} isActive={pathname === oldpath}>
              {page}
            </PathLink>
          </Fragment>
        )
      })}
    </div>
  )
}

type PathLinkProps = { href: string; isActive?: boolean }

function PathLink({
  href,
  children,
  isActive = false,
}: PropsWithChildren<PathLinkProps>) {
  const style =
    'text-xs capitalize font-semibold font-inter inline-flex justify-center items-center'

  if (isActive) {
    return <span className={style}>{children}</span>
  } else {
    return (
      <Link href={href} className={`${style} cursor-pointer text-blue-500`}>
        {children}
      </Link>
    )
  }
}
export default Breamdcumb
