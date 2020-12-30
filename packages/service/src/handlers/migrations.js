/* eslint-disable no-console */
import knexMigrate from 'knex-migrate';
import path from 'path';
import { pick } from 'ramda';

const validOptions = ['from', 'only', 'step', 'to'];

const MigrationType = Object.freeze({
  DOWN: 'DOWN',
  LIST: 'LIST',
  PENDING: 'PENDING',
  REDO: 'REDO',
  ROLLBACK: 'ROLLBACK',
  UP: 'UP',
});

const isListMigration = (migrationType) =>
  [MigrationType.LIST, MigrationType.PENDING].includes(migrationType);

const toAction = (action) =>
  MigrationType[(action || '').toUpperCase()] || MigrationType.LIST;

const doMigrations = async (migrationType, options = {}) => {
  const migrationsLog = [];
  const log = (event) => migrationsLog.push(event);

  const actualOptions = {
    ...pick(validOptions, options),
    cwd: path.resolve(__dirname, '../..'),
  };

  const response = await knexMigrate(
    migrationType.toLowerCase(),
    actualOptions,
    log
  );

  return isListMigration(migrationType) ? response : migrationsLog;
};

const handler = async (event = {}) => {
  console.log({ event });

  const actualAction = toAction(event.action);
  const migrations = await doMigrations(actualAction, event.options);
  const response = { migrations, requestedAction: actualAction };

  console.log(JSON.stringify(response));

  return response;
};

// handler({ action: MigrationType.LIST });

export { handler };
/* eslint-enable no-console */
