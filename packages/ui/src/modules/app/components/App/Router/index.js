import React from 'react';
import { Switch } from 'react-router-dom';
import { NotFound } from 'modules/notFound';
import { routes } from '../../../routes';
import { Route } from './Route';

const Router = () => (
  <Switch>
    {routes.map(route => (
      <Route key={route.name} {...route} />
    ))}
    <Route component={NotFound} />
  </Switch>
);

export { Router };
