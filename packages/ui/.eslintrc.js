const path = require('path');

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/recommended',
    'plugin:jest/recommended',
    'plugin:jest/style',
    'plugin:jsx-a11y/recommended',
    'plugin:ramda/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'eslint-comments',
    'import',
    'jest',
    'import-helpers',
    'jsx-a11y',
    'ramda',
    'react',
    'react-hooks',
  ],
  root: false,
  rules: {
    'max-statements': 'off',
    'no-process-env': 'warn',
    'prefer-named-capture-group': 'warn',
  },
  settings: {
    'import/resolver': {
      'eslint-import-resolver-lerna': {
        packages: path.resolve(__dirname, '../../packages'),
      },
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
    react: { version: 'detect' },
  },
};
