import { make } from './creation';
import { apiExample, dbExample, uiExample } from './examples';
import { dbToApi } from './transforms';
import { propTypes, typeDef } from './typedef';

const UserSnapshot = {
  apiExample,
  dbExample,
  dbToApi,
  make,
  propTypes,
  typeDef,
  uiExample,
};

export { UserSnapshot };
