import React from 'react';
import { Route as RouterRoute } from 'react-router-dom';
import { ErrorBoundary } from 'shared/ErrorBoundary';
import { Suspense } from 'shared/Suspense';
import { Route } from 'types/route';
import { Account } from '../Account';

const Routing = () => (
  <ErrorBoundary>
    <Suspense>
      <RouterRoute component={Account} exact path={Route.USER_ACCOUNT.path} />
    </Suspense>
  </ErrorBoundary>
);

export { Routing };
