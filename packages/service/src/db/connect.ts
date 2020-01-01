import { createConnection, getConnectionOptions } from 'typeorm';

const connect = async (overrides?: any) => {
  const connectionOptions = await getConnectionOptions();
  const options = { ...connectionOptions, ...overrides };

  await createConnection(options as any);
};

export { connect };
