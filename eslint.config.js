const js = require('@eslint/js');
const globals = require('globals');
const tseslint = require('typescript-eslint');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],

    languageOptions: {
      globals: globals.node,
    },

    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'off',
    },
  },

  eslintConfigPrettier,
];