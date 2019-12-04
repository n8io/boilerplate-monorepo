const git = require('git-rev-sync');
const updateDotEnv = require('update-dotenv');
const { version } = require('../package.json');

const hash = git.short();

updateDotEnv({
  REACT_APP_RELEASE: `${version}.${hash}`,
  REACT_APP_RELEASE_HASH: hash,
  REACT_APP_RELEASE_VERSION: version,
});
