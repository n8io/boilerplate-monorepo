import React, { Suspense } from 'react';
import { Layout } from './Layout';
import { ColdStart } from './Overlays/ColdStart';
import { Providers } from './Providers';
import { useAppReady } from './useAppReady';
import { useIsColdStarting } from './useIsColdStarting';

const App = () => {
  const isColdStarting = useIsColdStarting();
  const isReady = useAppReady();

  return (
    <Suspense fallback={null}>
      {isColdStarting && <ColdStart />}
      {isReady && (
        <Providers>
          <Layout />
        </Providers>
      )}
    </Suspense>
  );
};

export { App, Providers };
