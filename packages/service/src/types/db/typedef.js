import { config } from 'config';

const { DB_SCHEMA } = config;

const Schema = {
  MAIN: DB_SCHEMA,
};

const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const Table = {
  USERS: 'users',
};

export { Schema, SortDirection, Table };
