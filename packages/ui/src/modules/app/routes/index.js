import { defaultTo, map, mergeRight, pipe } from 'ramda';
import { Route } from 'types/route';
import { About } from 'modules/about';
import { Dashboard } from 'modules/dashboard';
import { Login } from 'modules/login';
import { NotFound } from 'modules/notFound';
import { SignUp } from 'modules/signUp';
import { TestPage } from 'modules/testPage';

const componentMap = {
  about: About,
  dashboard: Dashboard,
  login: Login,
  notFound: NotFound,
  root: Dashboard,
  signup: SignUp,
  testPage: TestPage,
};

const addComponent = route => {
  const component = defaultTo(Dashboard, componentMap[route.name]);

  return mergeRight(route, { component });
};

const navRoutes = pipe(
  Route.filterToNavigation,
  map(addComponent)
)(Route.values);

const routes = map(addComponent, Route.values);

export { navRoutes, routes };
