import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import vitest from 'eslint-plugin-vitest'
import { includeIgnoreFile } from '@eslint/compat'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const gitignorePath = path.resolve(__dirname, '.gitignore')

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  includeIgnoreFile(gitignorePath),
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  }),
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.stylisticTypeChecked,
    {
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
        },
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'error',
        'react/self-closing-comp': [
          'error',
          {
            component: true,
            html: true,
          },
        ],
      },
    },
    {
      files: ['**/*.js', '**/*.mjs'],
      extends: [tseslint.configs.disableTypeChecked],
    }
  ),
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/consistent-test-filename': 'error',
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
]

export default eslintConfig
