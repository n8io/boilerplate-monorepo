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

  if (hasMatch) return console.log(chalk.cyan('👍 Hosts file looks good!'));

  if (!isSudo) {
    return console.log(chalk.red('🤓 Please run again as sudo/admin'));
  }

  hostile.set(HOST, ALIAS, err => {
    if (err) {
      return console.log(chalk.red('🛑 Failed to update your hosts file', err));
    }

    console.log(chalk.green('👍 Hosts file updated successfully!'));
  });
})();
