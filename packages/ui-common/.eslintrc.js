const path = require('path');

module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  plugins: ['eslint-comments', 'import', 'jest', 'import-helpers', 'ramda'],
  root: false,
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
};
