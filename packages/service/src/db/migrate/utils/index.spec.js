import { config } from 'config';
import {
  Prefix,
  toEnumName,
  toIndexName,
  toPrimaryIndexName,
  toSchemaPrefixed,
  toTableName,
  toUniqueIndexName,
} from './index';

const { DATABASE_SCHEMA } = config;

describe('migrate utils', () => {
  const tableName = 'TABLE_NAME';
  const columnName = 'COLUMN_NAME';

  describe('toEnumName', () => {
    const enumName = 'ENUM_NAME';

    test('returns the proper enum name', () => {
      const actual = toEnumName(tableName, enumName);

      expect(actual).toEqual(
        `${DATABASE_SCHEMA}.${Prefix.ENUM}_${tableName}_${enumName}`
      );
    });
  });

  describe('toIndexName', () => {
    test('returns the proper index name', () => {
      const actual = toIndexName(tableName, columnName);

      expect(actual).toEqual(`${Prefix.INDEX}_${tableName}_${columnName}`);
    });
  });

  describe('toPrimaryIndexName', () => {
    test('returns the proper primary index name', () => {
      const actual = toPrimaryIndexName(tableName, columnName);

      expect(actual).toEqual(
        `${Prefix.INDEX_PRIMARY}_${tableName}_${columnName}`
      );
    });
  });

  describe('toSchemaPrefixed', () => {
    test('returns the proper prefixed name', () => {
      const actual = toSchemaPrefixed(tableName);

      expect(actual).toEqual(`${DATABASE_SCHEMA}.${tableName}`);
    });
  });

  describe('toTableName', () => {
    test('returns the proper prefixed name', () => {
      const actual = toTableName(tableName);

      expect(actual).toEqual(`${DATABASE_SCHEMA}.${tableName}`);
    });
  });

  describe('toUniqueIndexName', () => {
    test('returns the proper unique index name', () => {
      const actual = toUniqueIndexName(tableName, columnName);

      expect(actual).toEqual(`${Prefix.UNIQUE}_${tableName}_${columnName}`);
    });
  });
});
