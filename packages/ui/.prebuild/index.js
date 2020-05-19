const git = require('git-rev-sync');
const updateDotEnv = require('update-dotenv');
const { version } = require('../package.json');

const { NODE_ENV } = process.env;

if (NODE_ENV === 'development') {
  console.log('Skipping prebuild step (NODE_ENV = development)');

  process.exit(0);
}

const hash = git.short();

updateDotEnv({
  REACT_APP_RELEASE: version,
  REACT_APP_RELEASE_HASH: hash,
  REACT_APP_RELEASE_VERSION: `version`,
});

console.log(`👍 Successfully ran prebuild step for v${version}`);
