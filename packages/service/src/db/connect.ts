import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { logFactory } from 'log/logFactory';

const debugLog = logFactory({
  method: 'connect',
  module: 'db',
});

const connect = async (overrides?: any) => {
  debugLog('⏲️ Establishing connection to the database...');

  const connectionOptions = await getConnectionOptions();
  const options: any = {
    ...connectionOptions,
    ...overrides,
    namingStrategy: new SnakeNamingStrategy(),
  };

  const connection = await createConnection(options);

  debugLog('👍 Connected to the database');

  return connection;
};

export { connect };
