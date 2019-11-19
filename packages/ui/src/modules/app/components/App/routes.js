import { defaultTo, map, mergeRight, pipe } from 'ramda';
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

const routes = pipe(Route.navigation, map(addComponent))(Route.values);

export { routes };
