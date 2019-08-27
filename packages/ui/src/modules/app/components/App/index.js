import React from 'react';
import { Layout } from './Layout';
import { Providers } from './Providers';

const App = () => (
  <React.Suspense fallback={null}>
    <Providers>
      <Layout />
    </Providers>
  </React.Suspense>
);

export { App, Providers };
