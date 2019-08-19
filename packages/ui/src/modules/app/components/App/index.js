import React from 'react';
import { AppProviders } from './AppProviders';
import { Layout } from './Layout';

const App = () => (
  <React.Suspense fallback={null}>
    <AppProviders>
      <Layout />
    </AppProviders>
  </React.Suspense>
);

export { App, AppProviders };
