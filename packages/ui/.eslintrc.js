const path = require('path');
const baseConfig = require('../../.eslintrc');

module.exports = {
  ...baseConfig,
  env: {
    ...baseConfig.env,
    browser: true,
  },
  extends: [
    ...baseConfig.extends,
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'prettier/react',
  ],
  parserOptions: {
    ...baseConfig.parserOptions,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [...baseConfig.plugins, 'jsx-a11y', 'react', 'react-hooks'],
  root: false,
  settings: {
    ...baseConfig.settings,
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
