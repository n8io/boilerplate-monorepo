require('dotenv/config');

const path = require('path');

const {
  DATABASE_MIGRATION_SCHEMA,
  DATABASE_MIGRATION_TABLE_NAME,
  DATABASE_URL,
  DATABASE_USE_SSL,
  NODE_ENV,
  // eslint-disable-next-line no-process-env
} = process.env;

if (!DATABASE_URL) {
  // eslint-disable-next-line no-console
  console.error('DATABASE_URL not set. It is required for migrations to run.');

  // eslint-disable-next-line no-process-exit
  process.exit(1);
}

const distMigrations = path.join(__dirname, 'dist/migrations');
const srcMigrations = path.join(__dirname, 'src/migrations');

// eslint-disable-next-line no-sync
const directory = NODE_ENV === 'production' ? distMigrations : srcMigrations;

const defaults = {
  client: 'pg',
  connection: {
    connectionString: DATABASE_URL,
    ssl: DATABASE_USE_SSL ? { rejectUnauthorized: false } : false,
  },
  migrations: {
    directory,
    schema: DATABASE_MIGRATION_SCHEMA || 'public',
    tableName: DATABASE_MIGRATION_TABLE_NAME || 'migrations',
  },
  pool: {
    max: 10,
    min: 2,
  },
};

module.exports = {
  development: defaults,
  production: defaults,
  staging: defaults,
};
