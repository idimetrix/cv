/** @type {import("eslint").Linter.Config} */
module.exports = {
   extends: [
      'next/core-web-vitals',
      'plugin:jsx-a11y/strict',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:turbo/recommended', // Use the plugin directly instead of the config
   ],
   plugins: ['unused-imports', 'turbo'],
   rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-children-prop': 'off',
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
}
