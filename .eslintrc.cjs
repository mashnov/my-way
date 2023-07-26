/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  globals: {
    window: true,
    location: true,
    localCache: true,
    localStorage: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier',
    '@vue/eslint-config-typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_+$' }],
    'max-len': ['error', { 'code': 120 }]
  },
}
