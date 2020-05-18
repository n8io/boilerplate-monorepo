const updateDotEnv = require('update-dotenv');
const { version } = require('../package.json');

const { CI, YARN_PRODUCTION } = process.env;

if (!CI && !YARN_PRODUCTION) {
  console.log('Skipping prebuild step (not CI)');

  process.exit(0);
}

updateDotEnv({
  RELEASE: `${version}`,
});

console.log(`👍 Successfully ran prebuild step for v${version}`);
