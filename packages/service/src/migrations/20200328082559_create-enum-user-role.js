import { toEnumName } from 'db/migrate/utils';

const tableName = 'users';
const enumName = 'role';
const fullyQualifiedEnumName = toEnumName(tableName, enumName);

const up = knex =>
  knex.raw(`CREATE TYPE ${fullyQualifiedEnumName} AS ENUM ('ADMIN','USER')`);

const down = knex => knex.raw(`DROP TYPE ${fullyQualifiedEnumName}`);

export { down, up };
