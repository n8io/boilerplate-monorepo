import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "testPage" */
    './component'
  ).then(({ TestPage }) => ({ default: TestPage }))
);

export { Lazy as TestPage };
