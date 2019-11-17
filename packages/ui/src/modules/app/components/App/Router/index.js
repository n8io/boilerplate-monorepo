import React from 'react';
import { Switch } from 'react-router-dom';
import { NotFound } from 'modules/notFound';
import { Navigation } from '../Layout/Navigation/navigation';
import { Route as CustomRoute } from './Route';

const Router = () => (
  <Switch>
    {Navigation.map(route => (
      <CustomRoute key={route.name} {...route} />
    ))}
    <CustomRoute component={NotFound} />
  </Switch>
);

export { Router };
