const { FlatCompat } = require('@eslint/eslintrc')
const js = require('@eslint/js')
const turboPlugin = require('eslint-plugin-turbo')
const unusedImports = require('eslint-plugin-unused-imports')
const jsxA11y = require('eslint-plugin-jsx-a11y')
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsparser = require('@typescript-eslint/parser')

const compat = new FlatCompat({
   baseDirectory: __dirname,
   recommendedConfig: js.configs.recommended,
})

module.exports = [
   {
      ignores: [
         '**/node_modules/**',
         '**/.next/**',
         '**/dist/**',
         '**/build/**',
         '**/.turbo/**',
      ],
   },
   js.configs.recommended,
   ...compat.extends('next/core-web-vitals', 'prettier'),
   {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: {
         turbo: turboPlugin,
         'unused-imports': unusedImports,
         'jsx-a11y': jsxA11y,
         '@typescript-eslint': tseslint,
      },
      languageOptions: {
         parser: tsparser,
         parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            ecmaFeatures: {
               jsx: true,
            },
         },
      },
      rules: {
         ...turboPlugin.configs.recommended.rules,
         ...jsxA11y.configs.strict.rules,
         '@typescript-eslint/no-empty-object-type': 'off',
         '@typescript-eslint/no-unused-vars': 'off',
         '@typescript-eslint/no-explicit-any': 'off',
         'react/no-children-prop': 'off',
         'no-unused-vars': [
            'error',
            {
               argsIgnorePattern: '^_',
               varsIgnorePattern: '^_',
               caughtErrorsIgnorePattern: '^_',
            },
         ],
         'jsx-a11y/control-has-associated-label': [
            2,
            {
               labelAttributes: ['aria-label'],
               controlComponents: ['a', 'Link', 'button', 'Button'],
            },
         ],
         'jsx-a11y/alt-text': [
            2,
            {
               elements: ['img', 'object', 'area', 'input[type="image"]'],
               img: ['Image', 'ImageWithFallback'],
               object: ['Object'],
               area: ['Area'],
               'input[type="image"]': ['InputImage'],
            },
         ],
         'jsx-a11y/anchor-has-content': [
            2,
            {
               components: ['a', 'Link', 'Button', 'button'],
            },
         ],
         'jsx-a11y/anchor-is-valid': [
            2,
            {
               components: ['a', 'Link'],
               specialLink: ['hrefLeft', 'hrefRight'],
               aspects: ['noHref', 'invalidHref', 'preferButton'],
            },
         ],
      },
   },
]
