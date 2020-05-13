const { join } = require('path');
const baseConfig = require('../../jest.config.base');

const toPath = (relativePath) => join(__dirname, relativePath);

module.exports = {
  ...baseConfig,
  collectCoverageFrom: [toPath('src/*.js')],
  coveragePathIgnorePatterns: [
    toPath('src/config/*.js'),
    toPath('src/migrations/*.js'),
    toPath('src/setupTests.js'),
    toPath('src/testHelpers/*.js'),
  ],
  setupFilesAfterEnv: [toPath('src/setupTests.js')],
};
