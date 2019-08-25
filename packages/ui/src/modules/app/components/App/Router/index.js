import React from 'react';
import { Route as RouterRoute, Switch } from 'react-router-dom';
import { Routes } from 'types/routes';
import { Navigation } from '../Layout/Navigation/navigation';
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
