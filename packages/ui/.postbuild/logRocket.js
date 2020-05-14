const shell = require('shelljs');

const { LOGROCKET_API_TOKEN } = process.env;

const { exec } = shell;

const upload = (release) =>
  new Promise((resolve, reject) => {
    const releaseCmd = `yarn -s logrocket release ${release} --apikey="${LOGROCKET_API_TOKEN}"`;
    const uploadCmd = `yarn -s logrocket upload build/ --release=${release} --apikey="${LOGROCKET_API_TOKEN}"`;

    exec(releaseCmd, (code) => {
      if (code !== 0) return reject(code);

      exec(uploadCmd, (code) => {
        if (code !== 0) return reject(code);

        return resolve();
      });
    });
  });

module.exports = { upload };
