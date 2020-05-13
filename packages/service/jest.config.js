const { join } = require('path');
const baseConfig = require('../../jest.config.base');

const toPath = (relativePath) => join(__dirname, relativePath);

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: [
    toPath('*.js'),
    toPath('src/config'),
    toPath('src/migrations'),
    toPath('src/setupTests.js'),
    toPath('src/testHelpers'),
  ],
  setupFilesAfterEnv: [toPath('src/setupTests.js')],
};
