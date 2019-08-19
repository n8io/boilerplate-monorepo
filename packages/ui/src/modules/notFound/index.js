import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "notFound" */
    './component'
  ).then(({ NotFound }) => ({ default: NotFound }))
);

export { Lazy as NotFound };
