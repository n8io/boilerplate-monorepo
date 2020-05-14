const dotenv = require('dotenv');
const { version } = require('../package.json');

dotenv.config();

const makeRelease = () => {
  const { RELEASE } = process.env;

  return RELEASE || version;
};

module.exports = { makeRelease };
