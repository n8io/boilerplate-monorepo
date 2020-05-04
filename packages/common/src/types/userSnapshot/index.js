import { make } from './creation';
import { apiExample, dbExample } from './examples';
import { dbToApi } from './transforms';

const UserSnapshot = {
  apiExample,
  dbExample,
  dbToApi,
  make,
};

export { UserSnapshot };
