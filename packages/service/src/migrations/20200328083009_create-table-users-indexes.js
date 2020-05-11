import {
  toIndexName,
  toSchemaPrefixed,
  toTableName,
  toUniqueIndexName,
} from 'db/migrate/utils';
import { Db } from 'types/db';

const tableName = Db.Table.USERS;

const ColumnName = {
  deletedAt: 'deleted_at',
  email: 'email',
  name: 'name',
  username: 'username',
};

const IndexName = {
  deletedAt: toIndexName(tableName, ColumnName.deletedAt),
  email: toUniqueIndexName(tableName, ColumnName.email),
  name: toIndexName(tableName, ColumnName.name),
  username: toUniqueIndexName(tableName, ColumnName.username),
};

const fullyQualifiedTableName = toTableName(tableName);

const up = (knex) =>
  knex.schema.alterTable(fullyQualifiedTableName, (table) => {
    table.unique([ColumnName.email], IndexName.email);
    table.index([ColumnName.name], IndexName.name);
    table.unique([ColumnName.username], IndexName.username);
    table.index([ColumnName.deletedAt], IndexName.deletedAt);
  });

const down = (knex) =>
  knex.schema.alterTable(fullyQualifiedTableName, (table) => {
    table.dropIndex([], toSchemaPrefixed(IndexName.deletedAt));
    table.dropUnique([], IndexName.email);
    table.dropIndex([], toSchemaPrefixed(IndexName.name));
    table.dropUnique([], IndexName.username);
  });

export { down, up };
