// eslint.config.js
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.ts', 'src/*.ts', 'test/*.ts', 'eslint.config.js'],
    ignores: ['node_modules/*', '.vscode/*'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      prettier,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
    rules: {
      semi: ['warn', 'always'],
      quotes: ['warn', 'single'],
      'indent': ['warn', 2],
      'key-spacing': ['warn', {
        beforeColon: false,
        afterColon: true,
      }],
      'new-cap': ['warn', {
        newIsCap: true,
        capIsNew: false,
      }],
      'no-multiple-empty-lines': ['warn', {
        max: 1,
      }],
      'comma-style': ['warn', 'last'],
      'comma-spacing': ['warn', {
        before: false,
        after: true,
      }],
      'comma-dangle': ['warn', 'always-multiline'],
      'no-implicit-coercion': 'off',
      'no-invalid-this': 'warn',
      'no-multi-spaces': 'warn',
      'no-new-func': 'warn',
      'global-require': 'off',
      'no-console': 'warn',
      'object-curly-spacing': ['error', 'always'],
      'space-before-function-paren': ['warn', 'never'],
      'no-trailing-spaces': 'warn',
      'space-before-blocks': ['error', 'always'],
      'semi-spacing': ['error', {
        before: false,
        after: true,
      }],
      'arrow-spacing': ['error', {
        before: true,
        after: true,
      }],
      'space-infix-ops': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-unused-vars': 'warn',
      'no-unused-private-class-members': 'warn',
      '@typescript-eslint/no-unused-vars': 'off',
      'block-spacing': 'error',
      'no-undef': 'off',
    },
  },
];