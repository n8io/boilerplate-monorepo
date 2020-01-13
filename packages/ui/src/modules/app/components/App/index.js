import React, { Suspense } from 'react';
import { Layout } from './Layout';
import { Providers } from './Providers';
import { useAppReady } from './useAppReady';

const App = () => {
  const isReady = useAppReady();

  return (
    <Suspense fallback={null}>
      {isReady && (
        <Providers>
          <Layout />
        </Providers>
      )}
    </Suspense>
  );
};

export { App, Providers };
