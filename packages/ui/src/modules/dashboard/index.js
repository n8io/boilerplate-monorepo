import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "dashboard" */
    './component'
  ).then(({ Dashboard }) => ({ default: Dashboard }))
);

export { Lazy as Dashboard };
