const updateDotEnv = require('update-dotenv');
const { version } = require('../package.json');

const { CI } = process.env;

if (!CI) {
  console.log('Skipping prebuild step (not CI)');

  process.exit(0);
}

updateDotEnv({
  RELEASE: `${version}`,
});

console.log(`👍 Successfully ran prebuild step for v${version}`);
