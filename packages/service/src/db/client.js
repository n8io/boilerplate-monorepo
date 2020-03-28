import { Db } from 'types/db';
import { make as makeConnection } from './connection';

const client = (tableName, schema = Db.Schema.MAIN) =>
  makeConnection().from(`${schema}.${tableName}`);

export { client };
