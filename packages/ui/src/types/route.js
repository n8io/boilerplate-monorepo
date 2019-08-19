import { config } from 'config';
import { shape, string } from 'prop-types';
import { filter, map, pipe, prop, sortBy, toPairs } from 'ramda';
import { About } from 'modules/about';
import { Dashboard } from 'modules/dashboard';
import { NotFound } from 'modules/notFound';
import { TestPage } from 'modules/testPage';

const SORT_PROP_NAME = 'sortOrder';

export const propTypes = shape({
  name: string.isRequired,
  path: string.isRequired,
});

export const Route = {
  ABOUT: {
    [SORT_PROP_NAME]: 10,
    component: About,
    exact: true,
    name: 'about',
    path: '/about',
  },
  DASHBOARD: {
    [SORT_PROP_NAME]: 1,
    component: Dashboard,
    exact: true,
    name: 'dashboard',
    path: '/',
  },
  ERROR_PAGE: {
    [SORT_PROP_NAME]: config.isDebug ? 100 : undefined,
    component: TestPage,
    exact: true,
    name: 'testPage',
    path: '/test',
  },
  NOT_FOUND: {
    component: NotFound,
    name: 'notFound',
    path: '/404',
  },
  ROOT: {
    component: Dashboard,
    exact: true,
    name: 'root',
    path: '/',
  },
};

export const Navigation = pipe(
  filter(prop(SORT_PROP_NAME)),
  toPairs,
  map(([_key, value]) => value),
  sortBy(prop(SORT_PROP_NAME))
)(Route);
