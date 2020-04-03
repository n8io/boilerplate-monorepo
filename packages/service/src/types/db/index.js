import { apiToDb, dbToApi } from './transforms';
import { Schema, Table } from './typedef';

const Db = {
  Schema,
  Table,
  apiToDb,
  dbToApi,
};

export { Db };
