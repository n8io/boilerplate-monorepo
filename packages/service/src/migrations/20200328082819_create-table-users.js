import { toEnumName, toPrimaryIndexName, toTableName } from 'db/migrate/utils';
import { Db } from 'types/db';

const tableName = Db.Table.USERS;
const fullyQualifiedEnumName = toEnumName(tableName, 'role');
const fullyQualifiedTableName = toTableName(tableName);
const primaryKeyName = toPrimaryIndexName(tableName, 'id');

const up = knex =>
  knex.raw(`
    CREATE TABLE ${fullyQualifiedTableName} (
      id varchar NOT NULL,
      username varchar NOT NULL,
      role ${fullyQualifiedEnumName} NOT NULL DEFAULT 'USER'::${fullyQualifiedEnumName},
      given_name varchar NOT NULL,
      family_name varchar NOT NULL,
      name varchar NOT NULL,
      email varchar NOT NULL,
      password_hash varchar NOT NULL,
      password_reset_token varchar,
      password_reset_token_expiration timestamp,
      token_version int4 NOT NULL DEFAULT 0,
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NOT NULL DEFAULT now(),
      deleted_at timestamp NULL,
      deleted_by varchar NULL,
      CONSTRAINT ${primaryKeyName} PRIMARY KEY (id)
  );
`);

const down = knex => knex.raw(`DROP TABLE ${fullyQualifiedTableName};`);

export { down, up };
