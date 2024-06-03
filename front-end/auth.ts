import { getAvatarImage } from '@/components/TagInput/utils/image'

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import type { NextAuthConfig, User } from 'next-auth'

const credentialsConfig = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    email: {
      label: 'email',
      type: 'email',
    },
    password: { label: 'Password', type: 'password' },
  },
  async authorize(credentials) {
    const { email, password } = credentials

    const user: User = {
      id: '1',
      name: 'Mehdi Moulati',
      email: email as string,
      image: getAvatarImage('Mehdi Moulati'),
    }

    if (email && password) {
      return user
    } else {
      return null
    }
  },
})

const config = {
  providers: [Google, credentialsConfig],
  callbacks: {
    signIn({ user, account, credentials, profile, email }) {
      // console.log('\x01[31;42;0msignIn callback')
      console.log({ user, account, credentials, profile, email })
      return true
    },
    session(params) {
      // console.log('session callback')
      console.log(params)
      return params.session
    },
    authorized({ request, auth }) {
      // console.log('authorized callback')

      const { pathname } = request.nextUrl

      if (pathname === '') {
        return !!auth
      }
      return true
    },
  },
  pages: {
    signIn: '/',
    signOut: '/login',
    error: '/login',
    newUser: '/',
  },
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth(config)
