import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Suspense } from 'shared/Suspense';
import { Dashboard } from 'modules/dashboard';

const Router = () => (
  <Suspense>
    <Switch>
      <Route component={Dashboard}></Route>
    </Switch>
  </Suspense>
);

export { Router };
