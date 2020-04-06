import React from 'react';
import { Route as RouterRoute } from 'react-router-dom';
import { ErrorBoundary } from 'shared/ErrorBoundary';
import { Suspense } from 'shared/Suspense';
import { Route } from 'types/route';
import { Main } from './Main';
import { Security } from './Security';
import { Settings } from './Settings';

const Account = () => (
  <ErrorBoundary>
    <Suspense>
      <RouterRoute
        component={Security}
        exact
        path={Route.USER_ACCOUNT_SECURITY.path}
      />
      <RouterRoute
        component={Settings}
        exact
        path={Route.USER_ACCOUNT_SETTINGS.path}
      />
      <RouterRoute component={Main} exact path={Route.USER_ACCOUNT.path} />
    </Suspense>
  </ErrorBoundary>
);

export { Account };
