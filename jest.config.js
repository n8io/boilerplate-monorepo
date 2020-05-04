const baseConfig = require('./jest.config.base');

module.exports = {
  ...baseConfig,
  reporters: ['default', 'jest-junit'],
};
