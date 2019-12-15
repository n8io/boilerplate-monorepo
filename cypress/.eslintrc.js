const baseConfig = require('../.eslintrc');

module.exports = {
  ...baseConfig,
  root: false,
  rules: {
    ...baseConfig.rules,
    'jest/valid-expect': 'off',
  },
};
