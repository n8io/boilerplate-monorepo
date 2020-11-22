import { config } from 'config';

const { DATABASE_SCHEMA } = config;

const Schema = {
  MAIN: DATABASE_SCHEMA,
};

const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const Table = {
  USERS: 'users',
};

export { Schema, SortDirection, Table };
