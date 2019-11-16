import React, { Suspense } from 'react';
import { Layout } from './Layout';
import { Providers } from './Providers';

const App = () => (
  <Suspense fallback={null}>
    <Providers>
      <Layout />
    </Providers>
  </Suspense>
);

export { App, Providers };
