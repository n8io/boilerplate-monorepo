import { ProcessEnvKeys } from 'types/processEnv';

// eslint-disable-next-line no-process-env
const { [ProcessEnvKeys.DB_SCHEMA]: schema } = process.env;

const Prefix = {
  ENUM: 'enum',
  INDEX: 'idx',
  INDEX_PRIMARY: 'pk',
  UNIQUE: 'udx',
};

const toSchemaPrefixed = name => `${schema}.${name}`;

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

const toTableName = toSchemaPrefixed;

export {
  toEnumName,
  toIndexName,
  toPrimaryIndexName,
  toSchemaPrefixed,
  toTableName,
  toUniqueIndexName,
};
