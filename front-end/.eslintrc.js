module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      callees: ['classnames', 'clsx', 'ctl'],
      config: 'tailwind.config.ts',
      cssFiles: [
        '**/*.css',
        '!**/node_modules',
        '!**/.*',
        '!**/dist',
        '!**/build',
      ],
      cssFilesRefreshRate: 5_000,
      removeDuplicates: true,
      skipClassAttribute: false,
      whitelist: [],
      tags: [], // can be set to e.g. ['tw'] for use in tw`bg-blue`
      classRegex: '^class(Name)?$', // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
    },
  },

  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx', '*.test.ts'],
      parser: '@typescript-eslint/parser',
    },
    {
      files: [
        '__test__/**/*.{js,ts,tsx,tsx}',
        '__mock__/**/*.{js,ts,tsx,tsx}',
        '**/*.test.{js,ts,tsx,tsx}',
      ],
      env: {
        jest: true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'tailwindcss',
    'prettier',
    'react-hooks',
  ],
  rules: {
    semi: ['error', 'never'],
    'tailwindcss/no-custom-classname': 'error',
    'tailwindcss/no-contradicting-classname': 'error',
    'lines-around-comment': [
      'error',
      {
        beforeLineComment: true,
        allowBlockStart: true,
      },
    ],
    'multiline-ternary': ['error', 'never'],
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'padded-blocks': ['error', 'never'],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
      },
    ],
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc' },
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '@/types/*',
            group: 'type',
            position: 'after',
          },
          {
            pattern: '@/*',
            group: 'internal',
            position: 'before',
          },
        ],

        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',

    // seperate the types from function when importing
    '@typescript-eslint/consistent-type-imports': 'warn',

    // export the type  seperatly from the function
    // '@typescript-eslint/consistent-type-exports': 'warn',
  },
  ignorePatterns: [
    'node_modules',
    'build',
    'dist',
    'public',
    '*.json',
    '*.md',
    '.*$',
  ],
}
