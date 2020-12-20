import { UserRole } from '@boilerplate-monorepo/common';
import { toTableName } from 'db/migrate/utils';
import { Db } from 'types/db';

const tableName = Db.Table.USERS;

const fullyQualifiedTableName = toTableName(tableName);
const adminId = 'admin';

const up = (knex) =>
  knex.raw(`
    INSERT INTO ${fullyQualifiedTableName} (id, username, role, given_name, family_name, name, email, password_hash)
    VALUES ('${adminId}', 'admin', '${UserRole.ADMIN}', 'Nate', 'Clark', 'clark,nate', 'n8@n8io.com', '');
  `);

const down = (knex) =>
  knex.raw(`
    DELETE FROM ${fullyQualifiedTableName} WHERE id = '${adminId}';
  `);

export { down, up };
