import React from 'react';
import { Route as RouterRoute } from 'react-router-dom';
import { ErrorBoundary } from 'shared/ErrorBoundary';
import { Suspense } from 'shared/Suspense';

const Route = (props) => (
  <ErrorBoundary>
    <Suspense>
      <RouterRoute {...props} />
    </Suspense>
  </ErrorBoundary>
);

export { Route };
