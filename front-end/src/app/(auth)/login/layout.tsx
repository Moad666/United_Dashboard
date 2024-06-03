import UnitedLogo from '@/components/Icons/UnitedLogo'

import Link from 'next/link'
import React from 'react'

import type { PropsWithChildren } from 'react'

type layoutProps = object

const page = ({ children }: PropsWithChildren<layoutProps>) => {
  return (
    <div className="relative flex h-full flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-11">
        <div>
          <Link href="/">
            <UnitedLogo className="h-12" />
          </Link>
          <p className="text-center font-poppins text-xl font-medium">
            Architecture Dashboard
          </p>
        </div>
        <div className="flex  w-[458px] flex-col gap-10 rounded-xl border bg-white p-10 shadow-md">
          <div className="relative flex flex-col items-start justify-center">
            <h1 className="relative mb-2 self-stretch text-center font-poppins text-2xl font-bold leading-3 tracking-wide text-gray-900">
              Welcome Back
            </h1>
            <p className="relative self-stretch text-center text-sm font-normal  text-gray-400">
              Please enter your credentials
            </p>
          </div>
          {children}
          {/* <div className="relative whitespace-nowrap text-center text-sm font-medium leading-3 tracking-wide text-gray-900">
            Don&apos;t have an account?{' '}
            <Link href={'#'} className={styles.link}>
              Sign Up
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default page
