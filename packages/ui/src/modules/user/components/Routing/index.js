import React from 'react';
import { Route as RouterRoute, Switch } from 'react-router-dom';
import { AuthRoute } from 'shared/AuthRoute';
import { Route } from 'types/route';
import { Account } from '../Account';
import { Recovery } from '../Recovery';

const Routing = () => (
  <Switch>
    <RouterRoute component={Recovery} path={Route.USER_ACCOUNT_RECOVERY.path} />
    <AuthRoute component={Account} />
  </Switch>
);

export { Routing };
