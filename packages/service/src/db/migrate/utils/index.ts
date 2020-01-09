const { DB_SCHEMA: schema } = process.env;

const Prefix = {
  ENUM: 'enum',
  INDEX: 'idx',
  INDEX_PRIMARY: 'pk',
};

const toEnumName = (schemalessTableName: string, schemalessEnumName: string) =>
  `${schema}.${Prefix.ENUM}_${schemalessTableName}_${schemalessEnumName}`;

const toPrimaryIndexName = (schemalessTableName: string, columnName: string) =>
  `${Prefix.INDEX_PRIMARY}_${schemalessTableName}_${columnName}`;

const toIndexName = (schemalessTableName: string, columnName: string) =>
  `${Prefix.INDEX}_${schemalessTableName}_${columnName}`;

const toTableName = (schemalessTableName: string) =>
  `${schema}.${schemalessTableName}`;

export { toEnumName, toIndexName, toPrimaryIndexName, toTableName };
