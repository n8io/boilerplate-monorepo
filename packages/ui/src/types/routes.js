import { config } from 'config';
import { shape, string } from 'prop-types';

export const SORT_PROP_NAME = 'sortOrder';

export const propTypes = shape({
  name: string.isRequired,
  path: string.isRequired,
});

export const Routes = {
  ABOUT: {
    [SORT_PROP_NAME]: 10,
    exact: true,
    name: 'about',
    path: '/about',
  },
  DASHBOARD: {
    [SORT_PROP_NAME]: 1,
    exact: true,
    name: 'dashboard',
    path: '/',
  },
  NOT_FOUND: {
    [SORT_PROP_NAME]: config.isDebug ? 100 : undefined,
    name: 'notFound',
    path: '/404',
  },
  ROOT: {
    exact: true,
    name: 'root',
    path: '/',
  },
  TEST_PAGE: {
    [SORT_PROP_NAME]: config.isDebug ? 100 : undefined,
    exact: true,
    name: 'testPage',
    path: '/test',
  },
};
