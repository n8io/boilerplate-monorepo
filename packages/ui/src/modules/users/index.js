import { Utils } from '@boilerplate-monorepo/common';
import { lazy } from 'react';

const Lazy = lazy(() =>
  import(
    /* webpackChunkName: "users" */
    './components'
  ).then(Utils.renameKeys({ Users: 'default' }))
);

export { Lazy as Users };
