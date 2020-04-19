import { config } from 'config';
import knex from 'knex';
import { log } from 'log';
import { logFactory } from 'log/logFactory';
import { parse } from 'pg-connection-string';
import { multiply } from 'ramda';
import { Db } from 'types/db';

const { DATABASE_URL } = config;

const debugLog = logFactory({ method: 'connection', module: 'db' });

const seconds = multiply(1000);

const wait = numberOfSeconds =>
  new Promise(res => setTimeout(res, seconds(numberOfSeconds)));

const DB_TYPE = 'pg';

let cachedConnection = null;

const makeOptions = () => {
  const connection = parse(DATABASE_URL);

  return {
    client: DB_TYPE,
    connection,
  };
};

let attempts = 0;

// eslint-disable-next-line max-statements
const tryToConnect = async connection => {
  if (cachedConnection) return cachedConnection;

  let newConnection = null;

  try {
    newConnection = await knex(makeOptions());

    // Make sure we can connect
    await newConnection.raw(`SET SESSION SCHEMA '${Db.Schema.MAIN}';`);

    if (attempts) {
      log.info('Connected to the database');
    }
  } catch (err) {
    await wait(Math.pow(1.5, attempts));
    // eslint-disable-next-line require-atomic-updates
    attempts += 1;

    log.warn(`Attempt #${attempts} to connect to the database...`);

    newConnection = await tryToConnect(connection);
  }

  // eslint-disable-next-line require-atomic-updates
  cachedConnection = newConnection;

  return newConnection;
};

const make = connection => {
  if (cachedConnection) return cachedConnection;

  debugLog('⏳ Establishing connection to the database...');

  return tryToConnect(connection);
};

const connection = knex(makeOptions());

export { connection, make };
