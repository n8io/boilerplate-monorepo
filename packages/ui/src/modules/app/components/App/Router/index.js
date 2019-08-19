import React from 'react';
import { Route as RouterRoute, Switch } from 'react-router-dom';
import { Navigation, Route as Routes } from 'types/route';
import { Route } from './Route';

const { NOT_FOUND } = Routes;

const Router = () => (
  <Switch>
    {Navigation.map(route => (
      <Route key={route.name} {...route} />
    ))}
    <RouterRoute component={NOT_FOUND.component} />
  </Switch>
);

export { Router };
