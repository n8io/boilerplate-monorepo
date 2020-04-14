import React from 'react';
import { Route as RouterRoute, Switch, Redirect } from 'react-router-dom';
import { Route } from 'types/route';
import { Find } from './Find';
import { Notify } from './Notify';
import { Reset } from './Reset';
import { ResetLanding } from './ResetLanding';

const Recovery = () => (
  <Switch>
    <RouterRoute
      component={Find}
      exact
      path={Route.USER_ACCOUNT_RECOVERY_FIND.path}
    />
    <RouterRoute
      component={Notify}
      exact
      path={Route.USER_ACCOUNT_RECOVERY_NOTIFY.path}
    />
    <RouterRoute
      component={ResetLanding}
      exact
      path={Route.USER_ACCOUNT_RECOVERY_PASSWORD_RESET_LANDING.path}
    />
    <RouterRoute
      component={Reset}
      exact
      path={Route.USER_ACCOUNT_RECOVERY_PASSWORD_RESET.path}
    />
    <Redirect to={Route.USER_ACCOUNT_RECOVERY_FIND.path} />
  </Switch>
);

export { Recovery };
