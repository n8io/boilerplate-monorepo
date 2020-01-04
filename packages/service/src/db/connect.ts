import { createConnection, getConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const connect = async (overrides?: any) => {
  const connectionOptions = await getConnectionOptions();
  const options: any = {
    ...connectionOptions,
    ...overrides,
    namingStrategy: new SnakeNamingStrategy(),
  };

  await createConnection(options);
};

export { connect };
