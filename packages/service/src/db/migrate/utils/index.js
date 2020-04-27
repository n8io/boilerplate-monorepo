import { config } from 'config';

const { DB_SCHEMA } = config;

const Prefix = {
  ENUM: 'enum',
  INDEX: 'idx',
  INDEX_PRIMARY: 'pk',
  UNIQUE: 'udx',
};

const toSchemaPrefixed = name => `${DB_SCHEMA}.${name}`;

const toEnumName = (schemalessTableName, schemalessEnumName) =>
  toSchemaPrefixed(
    `${Prefix.ENUM}_${schemalessTableName}_${schemalessEnumName}`
  );

const toPrimaryIndexName = (schemalessTableName, columnName) =>
  `${Prefix.INDEX_PRIMARY}_${schemalessTableName}_${columnName}`;

const toIndexName = (schemalessTableName, columnName) =>
  `${Prefix.INDEX}_${schemalessTableName}_${columnName}`;

const toUniqueIndexName = (schemalessTableName, columnName) =>
  `${Prefix.UNIQUE}_${schemalessTableName}_${columnName}`;

export {
  Prefix,
  toEnumName,
  toIndexName,
  toPrimaryIndexName,
  toSchemaPrefixed,
  toSchemaPrefixed as toTableName,
  toUniqueIndexName,
};
