const dotenv = require('dotenv');
const { all } = require('ramda');

dotenv.config();

const envCheck = () => {
  const { CI } = process.env;

  if (!CI) {
    console.log('Skipping postbuild step (not CI)');

    process.exit(0);
  }

  const requiredKeys = [
    'LOGROCKET_API_TOKEN',
    'REACT_APP_RELEASE',
    'SENTRY_AUTH_TOKEN',
    'SENTRY_ORG',
    'SENTRY_PROJECT',
  ];

  const areAllEnvVarsSet = all(
    Boolean,
    requiredKeys.map((key) => process.env[key])
  );

  if (!areAllEnvVarsSet) {
    const msg = requiredKeys
      .map((key) => !process.env[key] && key)
      .filter(Boolean)
      .map((key) => `  ${key} was not provided`)
      .join('\n');

    console.error(
      `Skipping postbuild. The following environment variables were not provided:\n${msg}`
    );

    process.exit(0);
  }
};

module.exports = { envCheck };