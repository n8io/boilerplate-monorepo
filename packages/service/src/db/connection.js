import { config } from 'config';
import knex from 'knex';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import knexMock from 'mock-knex';
import { multiply } from 'ramda';
import { Db } from 'types/db';

const { DATABASE_URL, DATABASE_USE_SSL, isSqlDebug, isTest } = config;

const debugLog = logFactory({ method: 'connection', module: 'db' });

const seconds = multiply(1000);

const wait = (numberOfSeconds) =>
  new Promise((res) => setTimeout(res, seconds(numberOfSeconds)));

const DbType = { PG: 'pg', SQLITE_3: 'sqlite3' };

let cachedConnection = null;

const makeConnection = () => {
  let options = {
    client: DbType.SQLITE_3,
    connection: {
      filename: ':memory:',
    },
    useNullAsDefault: true,
  };

  if (!isTest) {
    options = {
      client: DbType.PG,
      connection: {
        connectionString: DATABASE_URL,
        ssl: DATABASE_USE_SSL ? { rejectUnauthorized: false } : false,
      },
      debug: isSqlDebug,
    };
  }

  const instance = knex(options);

  if (isTest) {
    knexMock.mock(instance);
  }

  return instance;
};

let attempts = 0;

const logError = (error, obj) => {
  log.error('Unexpected database error thrown', { error, obj });
};

// eslint-disable-next-line max-statements
const tryToConnect = async (connection) => {
  if (cachedConnection) return cachedConnection;

  let newConnection = null;

  try {
    newConnection = await makeConnection().on('query-error', logError);

    // Make sure we can connect
    await newConnection.raw(`SET SESSION SCHEMA '${Db.Schema.MAIN}'`);

    if (attempts) {
      log.info('Connected to the database');
    }
  } catch (err) {
    attempts += 1;

    await wait(Math.pow(1.5, attempts));

    log.warn(`Attempt #${attempts} to connect to the database...`);

    newConnection = await tryToConnect(connection);
  }

  // eslint-disable-next-line require-atomic-updates
  cachedConnection = newConnection;

  return newConnection;
};

const make = (connection) => {
  if (cachedConnection) return cachedConnection;

  debugLog('⏳ Establishing connection to the database...');

  return tryToConnect(connection);
};

const connection = makeConnection();

export { connection, make };
