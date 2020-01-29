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

const tryToConnect = async (currentConnection: Connection | undefined) => {
  if (currentConnection && currentConnection.isConnected)
    return currentConnection;

  const connectionOptions = await getConnectionOptions();
  const options: any = {
    ...connectionOptions,
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
    connection = await tryToConnect(currentConnection);
  }

  return connection;
};

const connect = (currentConnection: Connection | undefined) => {
  debugLog('⏳ Establishing connection to the database...');

  return tryToConnect(currentConnection);
};

export { connect };
