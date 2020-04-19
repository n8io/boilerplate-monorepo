// Update with your config settings.
require('dotenv/config');

const path = require('path');

const {
  DATABASE_URL,
  DB_MIGRATION_SCHEMA,
  DB_MIGRATION_TABLE_NAME,
  // eslint-disable-next-line no-process-env
} = process.env;

const defaults = {
  client: 'pg',
  connection: DATABASE_URL,
  migrations: {
    directory: path.join(__dirname, 'src/migrations'),
    schema: DB_MIGRATION_SCHEMA || 'public',
    tableName: DB_MIGRATION_TABLE_NAME || 'migrations',
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
