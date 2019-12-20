import { example } from './examples';
import { filterToNavigation } from './selectors';
import { Enumeration, SORT_PROP_NAME, propTypes, values } from './typedef';

export const Route = {
  ...Enumeration,
  SORT_PROP_NAME,
  example,
  filterToNavigation,
  propTypes,
  values,
};
