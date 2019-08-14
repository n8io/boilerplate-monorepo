import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Suspense } from 'shared/Suspense';
import { Route as Routes } from 'types/route';
import { Dashboard } from 'modules/dashboard';
import { Home } from 'modules/home';
import { NotFound } from 'modules/notFound';

const Router = () => (
  <Suspense>
    <Switch>
      <Route component={Home} exact path={Routes.ROOT.path}></Route>
      <Route component={Dashboard} exact path={Routes.DASHBOARD.path}></Route>
      <Route component={NotFound}></Route>
    </Switch>
  </Suspense>
);

export { Router };
