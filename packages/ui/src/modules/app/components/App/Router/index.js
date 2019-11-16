import React from 'react';
import { Route as RouterRoute, Switch } from 'react-router-dom';
import { Route as RouteType } from 'types/route';
import { Navigation } from '../Layout/Navigation/navigation';
import { Route } from './Route';

const { NOT_FOUND } = RouteType;

const Router = () => (
  <Switch>
    {Navigation.map(route => (
      <Route key={route.name} {...route} />
    ))}
    <RouterRoute component={NOT_FOUND.component} />
  </Switch>
);

export { Router };
