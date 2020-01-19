import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "login" */
    './components'
  ).then(Utils.renameKeys({ Login: 'default' }))
);

export { Lazy as Login };
