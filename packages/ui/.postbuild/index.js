const dotenv = require('dotenv');
const path = require('path');
const { upload } = require('sentry-files');
const shell = require('shelljs');

dotenv.config();

const { exec } = shell;

const {
  LOGROCKET_API_TOKEN,
  REACT_APP_RELEASE,
  SENTRY_API_TOKEN,
  SENTRY_ORGANIZATION,
  SENTRY_PROJECT,
} = process.env;

const RELEASE = REACT_APP_RELEASE;

const uploadSentrySourcemaps = async () => {
  const getFiles = () => {
    const BUILD_DIR = 'build';
    const assetsFile = path.resolve(BUILD_DIR, 'asset-manifest.json');
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const { files: filePaths } = require(assetsFile);
    // eslint-disable-next-line require-unicode-regexp, prefer-named-capture-group
    const jsFilesRegex = /(\.js(.map)?)$/;

    const files = Object.keys(filePaths)
      .filter(f => jsFilesRegex.test(f))
      .map(f => ({
        name: `~${filePaths[f]}`,
        path: path.join(__dirname, '../build', filePaths[f]),
      }));

    return files;
  };

  const options = {
    files: getFiles(),
    organization: SENTRY_ORGANIZATION,
    project: SENTRY_PROJECT,
    token: SENTRY_API_TOKEN,
    version: RELEASE,
  };

  return (
    upload(options)
      // eslint-disable-next-line no-console
      .then(data => console.log('----- SUCCESS ----\n', data))
      // eslint-disable-next-line no-console
      .catch(error => console.log('---- ERROR ----\n', error))
  );
};

const uploadLogRocketSourcemaps = () =>
  new Promise((resolve, reject) => {
    const releaseCmd = `yarn logrocket release ${RELEASE} --apikey="${LOGROCKET_API_TOKEN}"`;
    const uploadCmd = `yarn logrocket upload build/ --release=${RELEASE} --apikey="${LOGROCKET_API_TOKEN}"`;

    exec(releaseCmd, (code, _stdout, _stderr) => {
      if (code !== 0) return reject(code);

      exec(uploadCmd, (code, _stdout, _stderr) => {
        if (code !== 0) return reject(code);

        return resolve();
      });
    });
  });

(async () => {
  await Promise.all([uploadSentrySourcemaps(), uploadLogRocketSourcemaps()]);
})();
