const { ESLINT_MODES, whenProd } = require('@craco/craco');

module.exports = {
  babel: {
    plugins: [
      'add-react-displayname',
      ['babel-plugin-styled-components', { ssr: false }],
      ...whenProd(() => ['babel-plugin-jsx-remove-data-test-id'], []),
    ],
  },
  eslint: {
    loaderOptions: eslintOptions => ({
      ...eslintOptions,
      eslintPath: require.resolve('eslint'),
    }),
    mode: ESLINT_MODES.file,
  },
};
