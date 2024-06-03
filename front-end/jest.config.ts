import nextJest from 'next/jest.js'

import type { Config } from 'jest'

const createJestConfig = nextJest({

  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  rootDir: __dirname,
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': './src/$1',

    '^auth$': '<rootDir>/__mock__/auth.ts',
    '^next-auth/providers/credentials$':
      '<rootDir>/__mock__/next-auth/providers/credentials',
    '^next-auth/providers/google$':
      '<rootDir>/__mock__/next-auth/providers/google.ts',
    '^next-auth$': '<rootDir>/__mock__/next-auth.ts',
    '^next-auth/react$': '<rootDir>/__mock__/next-auth/react.ts',
    '^next/navigation$': '<rootDir>/__mock__/next/navigation.ts',
  },

  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
