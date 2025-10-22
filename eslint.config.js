import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'off',
    },
  },

  {
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
