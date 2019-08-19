import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "about" */
    './component'
  ).then(({ About }) => ({ default: About }))
);

export { Lazy as About };
