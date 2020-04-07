import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute } from 'shared/AuthRoute';
import { Route } from 'types/route';
import { Main } from './Main';
import { Profile } from './Profile';
import { Security } from './Security';

const Account = () => (
  <Switch>
    <AuthRoute component={Security} {...Route.USER_ACCOUNT_SECURITY} />
    <AuthRoute component={Profile} {...Route.USER_ACCOUNT_PROFILE} />
    <AuthRoute component={Main} {...Route.USER_ACCOUNT} />
  </Switch>
);

export { Account };
