import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute } from 'shared/AuthRoute';
import { List } from '../List';

const Routing = () => (
  <Switch>
    <AuthRoute component={List} />
  </Switch>
);

export { Routing };
