const { join } = require('path');
const baseConfig = require('../../jest.config.base');

const toPath = (relativePath) => join(__dirname, relativePath);

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: [
    toPath('*.js'),
    toPath('build'),
    toPath('src/config'),
    toPath('src/i18n'),
    toPath('src/setupTests.js'),
    toPath('src/testHelpers/*.js'),
  ],
  setupFilesAfterEnv: [toPath('src/setupTests.js')],
};
