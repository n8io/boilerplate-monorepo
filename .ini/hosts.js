const chalk = require('chalk');
const hostile = require('hostile');
const isElevated = require('is-elevated');

const HOST = '127.0.0.1';
const ALIAS = 'local.host';

const readHosts = () =>
  new Promise((resolve, reject) => {
    hostile.get(false, (err, lines) => {
      if (err) {
        console.error(err.message);

        return reject(err);
      }

      return resolve(lines);
    });
  });

(async () => {
  const isSudo = await isElevated();
  const pairs = await readHosts();

  const hasMatch = pairs.some(
    ([host, alias]) => host === HOST && alias.toLowerCase() === ALIAS
  );

  if (hasMatch) return;

  if (!isSudo) {
    console.log(
      chalk.yellow(`😬 Your hosts file is missing an entry for ${ALIAS}`)
    );
  }

  if (!isSudo) {
    console.log(
      chalk.red(
        '🤓 Please run the following command as sudo (or admin) to add:\n\n  yarn hosts\n'
      )
    );

    process.exit(1);
  }

  hostile.set(HOST, ALIAS, (err) => {
    if (err) {
      return console.log(chalk.red('🛑 Failed to update your hosts file', err));
    }

    console.log(chalk.green('👍 Hosts file updated successfully!'));
  });
})();
