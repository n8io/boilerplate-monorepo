const git = require('git-rev-sync');
const updateDotEnv = require('update-dotenv');
const { version } = require('../package.json');

updateDotEnv({
  REACT_APP_RELEASE_HASH: `${version}.${git.short()}`,
});
