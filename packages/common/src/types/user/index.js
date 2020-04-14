import { apiExample, uiExample } from './examples';
import { apiToDb, dbToApi } from './transforms';
import { propTypes, typeDef } from './typedef';

const User = {
  apiExample,
  apiToDb,
  dbToApi,
  propTypes,
  typeDef,
  uiExample,
};

export { User };
