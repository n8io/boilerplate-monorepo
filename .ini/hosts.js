const chalk = require('chalk');
const hostile = require('hostile');
const isElevated = require('is-elevated');

const HOST = '127.0.0.1';
const ALIAS = 'local.host';
const ALIAS_GRAPHQL = 'graphql.local.host';

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

const setHost = ({ alias, host, hosts }) =>
  new Promise((resolve, reject) => {
    const hasMatch = hosts.some(
      ([existingHost, existingAlias]) =>
        existingHost === host && existingAlias.toLowerCase() === alias
    );

    if (hasMatch) return resolve();

    hostile.set(host, alias, (err) => {
      if (err) {
        console.log(chalk.red('🛑 Failed to update your hosts file', err));

        reject(err);
      }

      console.log(chalk.green(`👍 "${host} ${alias}" added to hosts file!`));

      resolve();
    });
  });

(async () => {
  const isSudo = await isElevated();

  if (!isSudo) {
    console.log(
      chalk.red(
        '🤓 Please run the following command with elevated privileges to update your hosts file:\n\n sudo yarn hosts\n'
      )
    );

    process.exit(1);
  }

  const hosts = await readHosts();

  await setHost({ alias: ALIAS, host: HOST, hosts });
  await setHost({ alias: ALIAS_GRAPHQL, host: HOST, hosts });
})();
