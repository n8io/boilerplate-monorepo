const path = require('path');

module.exports = {
  env: {
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
