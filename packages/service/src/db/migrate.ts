import { getConnection } from 'typeorm';

const migrate = async () => {
  const hasPendingMigrations = await getConnection().showMigrations();

  if (hasPendingMigrations) {
    console.info('🚚 Running migrations...');

    await getConnection().runMigrations();
  }
};

export { migrate };
