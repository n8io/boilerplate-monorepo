import React from 'react';
import { Switch } from 'react-router-dom';
import { NotFound } from 'modules/notFound';
import { routes } from '../routes';
import { Route as CustomRoute } from './Route';

const Router = () => (
  <Switch>
    {routes.map(route => (
      <CustomRoute key={route.name} {...route} />
    ))}
    <CustomRoute component={NotFound} />
  </Switch>
);

export { Router };
