import { getConnection } from 'typeorm';
import { log } from 'logger';

const migrate = async () => {
  const hasPendingMigrations = await getConnection().showMigrations();

  if (hasPendingMigrations) {
    log.info('Running migrations...');

    await getConnection().runMigrations();
  }
};

export { migrate };
