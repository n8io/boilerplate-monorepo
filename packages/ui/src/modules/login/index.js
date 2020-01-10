import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "login" */
    './component'
  ).then(Utils.renameKeys({ Login: 'default' }))
);

export { Lazy as Login };
