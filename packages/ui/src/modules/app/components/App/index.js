import React from 'react';
import { AppProviders } from './AppProviders';
import { Layout } from './Layout';

const App = () => (
  <AppProviders>
    <Layout />
  </AppProviders>
);

export { App, AppProviders };
