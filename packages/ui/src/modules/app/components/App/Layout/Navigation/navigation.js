import {
  defaultTo,
  filter,
  map,
  mergeRight,
  pipe,
  prop,
  sortBy,
  values,
} from 'ramda';
import { Route } from 'types/route';
import { About } from 'modules/about';
import { Dashboard } from 'modules/dashboard';
import { NotFound } from 'modules/notFound';
import { TestPage } from 'modules/testPage';

const componentMap = {
  about: About,
  dashboard: Dashboard,
  notFound: NotFound,
  root: Dashboard,
  testPage: TestPage,
};

const addComponent = route => {
  const component = defaultTo(Dashboard, componentMap[route.name]);

  return mergeRight(route, { component });
};

export const Navigation = pipe(
  filter(prop(Route.SORT_PROP_NAME)),
  values,
  sortBy(prop(Route.SORT_PROP_NAME)),
  map(addComponent)
)(Route.values);
