const path = require('path');
const baseConfig = require('../../.eslintrc');

module.exports = {
  ...baseConfig,
  env: {
    ...baseConfig.env,
    browser: true,
  },
  root: false,
  settings: {
    ...baseConfig.settings,
    'import/resolver': {
      ...baseConfig.settings['import/resolver'],
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
};
