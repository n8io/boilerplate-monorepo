const { join } = require('path');
const baseConfig = require('../../jest.config.base');

const toPath = (relativePath) => join(__dirname, relativePath);

module.exports = {
  ...baseConfig,
  coveragePathIgnorePatterns: [
    toPath('*.js'),
    toPath('dist'),
    toPath('**/examples.js'),
    toPath('src/setupTests.js'),
  ],
};
