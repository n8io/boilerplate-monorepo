const SentryCli = require('@sentry/cli');

const upload = async (release) => {
  const cli = new SentryCli();

  try {
    console.log(`Creating sentry release: ${release}`);
    await cli.releases.new(release);

    console.log('Uploading source maps...');
    await cli.releases.uploadSourceMaps(release, {
      include: ['dist'],
      rewrite: false,
    });

    console.log('Finalizing release');
    await cli.releases.finalize(release);
  } catch (e) {
    console.error('Source maps uploading failed:', e);
  }
};

module.exports = { upload };
