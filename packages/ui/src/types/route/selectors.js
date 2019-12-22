import { filter, pipe, prop, sortBy } from 'ramda';
import { SORT_PROP_NAME } from './typedef';

const filterToNavigation = pipe(
  filter(prop(SORT_PROP_NAME)),
  sortBy(prop(SORT_PROP_NAME))
);

export { filterToNavigation };
