import { createConnection, getConnectionOptions, Connection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { logFactory } from 'log/logFactory';
import { multiply } from 'ramda';

const debugLog = logFactory({
  method: 'connect',
  module: 'db',
});

const seconds = multiply(1000);

const wait = (numberOfSeconds: number = 1) =>
  new Promise(res => setTimeout(res, seconds(numberOfSeconds)));

let attempts: number = 1;

const tryToConnect = async (overrides: any) => {
  const connectionOptions = await getConnectionOptions();
  const options: any = {
    ...connectionOptions,
    ...overrides,
    namingStrategy: new SnakeNamingStrategy(),
  };

  let connection: Connection;

  try {
    connection = await createConnection(options);

    debugLog('👍 Connected to the database');
  } catch (err) {
    await wait(attempts);
    attempts = attempts + 1;

    debugLog(`🔌 Attempt #${attempts} to connect to the database...`);
    connection = await tryToConnect(overrides);
  }

  return connection;
};

const connect = (overrides?: any) => {
  debugLog('⏳ Establishing connection to the database...');

  return tryToConnect(overrides);
};

export { connect };
