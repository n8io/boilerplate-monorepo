const dotenv = require('dotenv');
const { version } = require('../package.json');

dotenv.config();

const makeRelease = () => {
  const { REACT_APP_RELEASE } = process.env;

  return REACT_APP_RELEASE || version;
};

module.exports = { makeRelease };
