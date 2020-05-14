const { envCheck } = require('./envCheck');
const { makeRelease } = require('./makeRelease');
const { upload: sentryUpload } = require('./sentry');

const main = async () => {
  envCheck();

  const release = makeRelease();

  await sentryUpload(release);

  console.log(`👍 Successfully ran postbuild step for v${release}`);
};

main();
