import { example } from './examples';
import { navigation } from './selectors';
import { Enumeration, SORT_PROP_NAME, propTypes, values } from './typedef';

export const Route = {
  ...Enumeration,
  SORT_PROP_NAME,
  example,
  navigation,
  propTypes,
  values,
};
