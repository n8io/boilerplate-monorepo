import { ProcessEnvKeys } from '../processEnv';

const Schema = {
  // eslint-disable-next-line no-process-env
  MAIN: process.env[ProcessEnvKeys.DB_SCHEMA],
};

const SortDirection = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const Table = {
  USERS: 'users',
};

export { Schema, SortDirection, Table };
