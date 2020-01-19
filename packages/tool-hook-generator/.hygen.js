const toTypeFields = require('./src/toTypeFields');
const toArgs = require('./src/toArgs');
const toArgDeclarations = require('./src/toArgDeclarations');
const toInputInfo = require('./src/toInputInfo');
const touch = require('./src/touch');

module.exports = {
  helpers: {
    toArgDeclarations,
    toArgs,
    toInputInfo,
    toTypeFields,
    touch,
  },
};
