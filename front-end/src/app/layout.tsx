import Provider from '@/components/Providers/Provider'

import { Inter, Manrope, Nunito, Poppins, Quicksand } from 'next/font/google'
import React from 'react'

import type { Metadata } from 'next'

import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  weight: 'variable',
  style: ['normal'],
  display: 'swap',
})
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
})
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: 'variable',
  style: ['normal', 'italic'],
  display: 'swap',
})
const manrope = Manrope({
  subsets: [
    'cyrillic',
    'cyrillic-ext',
    'greek',
    'latin',
    'latin-ext',
    'vietnamese',
  ],
  variable: '--font-manrope',
  weight: 'variable',
  style: ['normal'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Architechture Dashboard',
  description: 'Managing Applications',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${[nunito, quicksand, poppins, inter, manrope].map((font) => font.variable).join(' ')}`}
    >
      <body className={`${inter.className}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
